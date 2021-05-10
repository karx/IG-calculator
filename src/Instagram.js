import firebase from './Firebase';
const firestore = firebase.firestore();

function pushDataToFirebase(data) {
  if (data.Account.id) {

  }
  var instagramIdRef = firestore.collection(`ig_users`).doc(`${data.Account.id}`);
  var isSet = instagramIdRef.set(
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
    fetch("https://www.instagram.com/" + username + "/channel/?__a=1")
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
        if (accountJson.isErrored) {
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
