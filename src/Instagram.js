import firebase from './Firebase';
const firestore = firebase.firestore();

async function pushDataToFirebase(data) {
  if (data.Account.id) {

  }
  var instagramIdRef = firestore.collection(`ig_users`).doc(`${data.Account.id}`);
  var isSet = await instagramIdRef.set(
    data.Account
  );
  console.log(isSet);
}

export function FetchData(username) {
  // return new Promise((resolve, reject) => {
  //   resolve({
  //     Account: pp.graphql.user,
  //     Medias: mm.data.user.edge_owner_to_timeline_media
  //   });
  // });
  return new Promise((resolve, reject) => {
    fetch("https://www.instagram.com/" + username + "/?__a=1")
      .then((data) => {
        console.log("Data: ", data);
        // console.log("DataJson: ", data.json());
        // if (!data || !data.Medias || data.Medias.length < 1)
        //   return null;
        return data;
      })
      .then(account => {
        console.log('the Response: ', account);
        if (account.status === 200) {
          return account.json();
        } else {
          if (account.status === 404) {
            console.log('404');
            return {
              "isErrored": true,
              "error": "Account not found"
            };
          } else {
            console.log('Random Error ', account.status);
            return {
              "isErrored": true,
              "error": account.status
            }
          }
        }
        
      })
      .then(accountJson => {
        if(accountJson.isErrored) {
          console.log('returning none as errored');
          return resolve(accountJson);
        } else {
          console.log('Fetching');
          fetch(
            "https://www.instagram.com/graphql/query/?query_id=17888483320059182" +
              "&id=" +
              accountJson.graphql.user.id +
              "&first=" +
              50
          )
            .then(account_media => account_media.json())
            .then(account_mediaJson => {
              //Get Medias
              var Result = {};
  
              //Prepare data to return
              Result.Account = accountJson.graphql.user;
              Result.Medias =
                account_mediaJson.data.user.edge_owner_to_timeline_media;
              console.log(Result);
              pushDataToFirebase(Result);
              return resolve(Result);
            })
            .catch(error => {
              console.error(error);
            });
        }
        
      })
      .catch(error => {
        console.error(error);
      });
  });
}


export async function fetchTagWiseData(tag) {
  let relevent_profiles = await firestore.collection(`ig_users`).get()
    .then( (profileSnapshopts) => {
    

    let profiles_with_tag = [];

    profileSnapshopts.forEach((pProfile) => {
      let profileData = pProfile.data();
      // console.log(profileData);
      
      let relevenceScore = calcProfileRelevence(profileData,tag);
      profileData.relevenceScoreOfTag = relevenceScore;
      console.log(`${profileData.username} -> ${relevenceScore}`);
      if (relevenceScore > 0) {
        profiles_with_tag.push(profileData);
      }
    });

    console.log(`We have ${profiles_with_tag.length} profiles with the tag`);
    profiles_with_tag.sort( (a, b) => {
      return b.relevenceScoreOfTag - a.relevenceScoreOfTag
    })

    return profiles_with_tag;
  });
  return relevent_profiles;

}

function calcProfileRelevence(profile,tag) {
  let bioText = profile.biography;


  let tag_count_in_medias = 0;
  let media_array = profile.edge_owner_to_timeline_media.edges;
  media_array.forEach( (media) => {
    let mediaData = media.node;
    if(mediaData.edge_media_to_caption.edges[0]) {
      let mediaCaption = mediaData.edge_media_to_caption.edges[0].node.text.toLowerCase();
      let tagCount = mediaCaption.split(tag).length - 1;
  
      tag_count_in_medias += tagCount;
    }
    
  });

  return tag_count_in_medias;

}