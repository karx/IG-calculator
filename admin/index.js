var cron = require('node-cron');
const fetch = require("node-fetch");

var admin = require("firebase-admin");
var serviceAccount = require("./firebase-service-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

let firestore = admin.firestore();

function FetchData(username) {
  return new Promise((resolve, reject) => {
    fetch("https://www.instagram.com/" + username + "/?__a=1")
      .then((data) => {
        // console.log("Data: ", data);
        return data;
      })
      .then((account) => {
        // console.log("the Response: ", account);
        if (account.status === 200) {
          return account.json();
        } else {
          if (account.status === 404) {
            console.log("404");
            return {
              isErrored: true,
              error: "Account not found",
            };
          } else {
            console.log("Random Error ", account.status);
            return {
              isErrored: true,
              error: account.status,
            };
          }
        }
      })
      .then((accountJson) => {
        if (accountJson.isErrored) {
          console.log("returning none as errored");
          return resolve(accountJson);
        } else {
          console.log("Fetching Acount Details");
          fetch(
            "https://www.instagram.com/graphql/query/?query_id=17888483320059182" +
              "&id=" +
              accountJson.graphql.user.id +
              "&first=" +
              50
          )
            .then((account_media) => account_media.json())
            .then((account_mediaJson) => {
              //Get Medias
              var Result = {};

              //Prepare data to return
              Result.Account = accountJson.graphql.user;
              Result.Medias =
                account_mediaJson.data.user.edge_owner_to_timeline_media;
              console.log(`@${Result.Account.username} : ${Result.Account.biography}`);
              pushDataToFirebase(Result);
              return resolve(Result);
            })
            .catch((error) => {
              console.error(error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  });
}

async function pushDataToFirebase(data) {
  if (data.Account.id) {
  }
  var instagramIdRef = firestore
    .collection(`ig_users`)
    .doc(`${data.Account.id}`);
  var isSet = await instagramIdRef.set(data.Account);
  console.log(`Write Complete!`);
}

function FetchArray(arr) {
    arr.forEach((profile) => FetchData(profile));
}

// //Test
// FetchArray(['karx01', 'recharge_tech', 'kaaroclick']);

// // IG list 1https://ruskmedia-my.sharepoint.com/:x:/r/personal/hardik_ruskmedia_com/_layouts/15/Doc.aspx?sourcedoc=%7B19B9D419-8358-4434-B5BB-3E5F2A9819C9%7D&file=Instagram.xlsx&action=default&mobileredirect=true
// FetchArray(['naughtyworld_','ghantaa','trolls_official','adultsociety','sarcastic_us','idiotic_sperm','chutiyapa_begins_from_here','log.kya.kahenge','log.kya.sochenge','error69','_dekhbhai_','officialtis','_adultgram_','sarcasmicguy','chutiya.spotted','trollfuckers','jeejaji','mylove4friendship','the.realshit.gyan','sunnobc','_epic69','bcbilliofficial','superchutya','haq_se_single','just.indian.things','desi.sarcasm','dekhpagli','high.br0','fuddu_Sperm','insta_desii','just.indian.stuff','_.chutiyapa._','studentsfacts.in','superhumour','brainchod','viralsarcasm','desi.joke','facts.of.students','epicpubgmemes','bakchodioverload','sarcastic.joker','just.adulting','trollscasm','be_harami','adultfamily','ashleelgyaan','thesarcasticpage','daily_over_dose','_naughtysociety','chutiyapa_overdose','yoo_bros','igsperm','filmygags','desii.crap','trollcasmic','luvfeelings_','cutest_conversations','roflbc','bakchoditroll','_naughtynation','single.shitt','comedycollege','ifriendshipdaily','theloverspoint69','_coupplebites','dirty.sperm','thenaughtytrolls','_naughtyjokes','attitude_status_page','ghantagram_memes','indian.epic.memes','students.facts','naughtysperms','hutiyastic','desi.bakchod','indianboi','be.tharki','just18plusthings','log.kis.kisko.thokege','just.hasley.things','awesomesness_is_here','sarcasticadult','adult_society_','_adultpedia','hutia_minati','adult_channel_','dr.sins','johnnylaal','18plusfamily','69gags','sexybhasha','nagarpalika.memes_','thetrendingindian','love_c0uple','lovers.bay','__justcouplethings','dankbedroomtales','18plusboi','single.stud','meme.sutra','chaai_garam','trollgramofficial','ghantabencho','high.on.weed','awwwcute_','aww_conversations','girlzfactsofficial','terebinyaara','relatedtolove','osm_lines','wow_chats','osm_page','the.silentlove','pointless_existence_','bezubaan_quotes','cute_feeling','shayari143.in','tru_feelings','togetherforever._.','unsaidword_4','cluster_of_quotes','the_letters_you_left_behind','girlssaying.ss','_quotesworld__','tera_bhaii','shinchan_loverzz','bezzuban_thoughts','luv_tales','_aww_wali_feeling','thescriptedstories','thescriptedshayari','most_cute_conversation','music.love.quotes','shinchanmemes','osm_diary','thesoulfulshayari','lastwords.__','crazychat_insta','brokenbedstories','_love_school_','theromanticfeeling','love.connection_','pehla.pyar','funny_shinchan','scratchedstories','divinestories','thebedroomstories','grownupfeels','wetbedtales','couple_luww','relationship_stats','love_c0uple','soulfull_tales','thebreakupfeeling','_cute_relationship__','painful_lines','mylovebrokemyheartt','lovers.bay','factrevealed','success.tip','factsofstudents','thecompletefacts','ifacts.daily','_factmall_','time4knowledge','fact.pro','knowledge4genius','logicdetector','millionair_lines','theboys.club','the.boys.life','loser2leader','why_so_serious_rk','one_wise_life','mr_villain_quotes','paralleluinverse.in','millionaire_quotes','one_vision999','im.successfull','knowledge_facts','filmygyan','filmymantramedia','filmytantrik','mylove4bollywood','filmygalaxy','vippollywood','punjabi_tadka','bollywoodfridays','filmygyan18','filmymantrafashiondiaries','filmygyanpictures','fillmygyanfitness','filmygyanvideos','filmymantraviral','viratkohli.club','msdhoni.07club','hardik.pandya.club','rahulkl.fc','rohitgsharma.club','cricket.freak','bleed.dhonism','ms.mahi7781','m.s_dhoni.7','msdhoni.fan07','indiancricketteam7','dhoni.bhakt','that.slaying.captain','followindiancricket','rishabhpant17','sureshraina.addicts','ms.dhoni.inspiration','msd_lover_','ipl.t20official','rohitsharmafansofficial','cricuniverse','iplt20.news','femalecricket','humansofcinema','theindianidiot','ad.parody','the_engineer_bro','dankstory','instantbollywood','voompla','madovermarketing_mom']);

// // Lifestyle https://ruskmedia-my.sharepoint.com/:x:/r/personal/hardik_ruskmedia_com/_layouts/15/Doc.aspx?sourcedoc=%7B62419E61-7546-4F04-ACFA-1B4EDE1AC8D0%7D&file=300K%2B%20INFLUENCERS%20LIFESTYLE.xlsx&action=default&mobileredirect=true
// FetchArray(['maeramishra','ruma_sharmaa','saanyaakhatterr','meghaguptaofficial','asmitarora','ektamaru03','nayani_pavani','anjimaxuofficially','riimusicofficial','matyldab8','arushi.handa.official','i_nibedita','akshatasonawane']);

// //IG 2
// FetchArray(['avneetkaur_13','arishfakhan138','ashishchanchlani','ashnoorkaur','sameer_mark','kanchisingh09','iamankittasharma','iamsoundaryasharma','gima_ashi','thehasleyindia','vishalpandey_21','roshniwaliaa','richi.shah','scarlettmrose','priyankakhera08','sheeva_rana','saloniseh','urf7i','prakrutimishra','ishaanandsharmaofficial','sidhikasharma','shefalibaggaofficial','sakshidwivediofficial','deepikabutola','chitranshi_dhyani','simratkaur_16','asmitarora','aaryavora','simran_dhanwani','sid.akki','sid.akki','xaahnax','sarahkhatri','rameet_sandhu','manisha    20','rishhsome','rishxpress','beingshadabkhan.27','r.anshuman','roshgupta_','styleonwings','belikeeaabirr','shefalibaggaofficial','unnatipatwa','singhjaijeet_4','yasminpathan_official','fahadalli','sakshisharma68','aashiadani','shabostoc','amanpreetkaurrr','karishmarawat','shruti_2611','vidishasrivastava','reel_anushka','riyaadixit','reel_anushka','impratishtha','twinkle.sharmaa','mallaica','kirtimehra31','prachikapoorxo','classifiedbird','shagunmehta','akashdodeja','mayankbhardwaj_','aneesahukani','dishagoyalofficial','sahibnoorsingh','style_virgo','himani.sahani_','vaishnavi_andhale','thestylecurator','nikitabhamidipati','akankshaaryaa','fit_feriha','cherry.bomb_official','fottyseven','apurvamehrota','neelam_sharmaofficial','rashmeetkaursethi','vidushi.singh25','fiza.manchandaa','priabeniwal','jaisleenkaurr','iabhishekkapoor','swini2004','gul.kaur','jaigogill','pallavi_gaba','ambrishverma3011','simran_nagpall','srishtivaid01','sankalra','mehekmehra93']);

// // Rusk Lifestyle
// FetchArray(['anushkasen0408','tanyasharma27','emani_rawat','the_megha_prasad','mehakanandd','mili_lakhmani','sana_khan62','theriyasubodh','karuunaa_bhushan','sanakhan00','maeramishra','anupriya_1709']);

async function refreshAllProfiles() {
    let all_profiles_userName = await getAllSavedProfileUserNames();
    FetchArray(all_profiles_userName);
}

async function getAllSavedProfileUserNames() {
    let all_users =await  firestore.collection(`ig_users`).get();
    let all_profiles_userName = [];
    all_users.forEach((profile) => {
        let profileData = profile.data();
        all_profiles_userName.push(profileData.username);
    });
    return all_profiles_userName;
}



cron.schedule('0 */4 * * *', async ()=> {
    console.log('Running every 4 hours');
    refreshAllProfiles();
});