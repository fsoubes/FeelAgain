import mongoose from "mongoose";

const seedDB = async () => {
  try {
    await mongoose.connection.models.User.create([
      {
        email: "bob@bob.fr",
        nickname: "bob",
        password:
          "$argon2i$v=19$m=4096,t=3,p=1$SKcpzKdXCrqY4RvImpFKBA$MCO99B5R/yVdICwkRph9lfBAqxeoMxEwppB65aTVSEs",
      },
      {
        email: "bob2@bob.fr",
        nickname: "bob2",
        password:
          "$argon2i$v=19$m=4096,t=3,p=1$SKcpzKdXCrqY4RvImpFKBA$MCO99B5R/yVdICwkRph9lfBAqxeoMxEwppB65aTVSEs",
      },
      {
        email: "bob3@bob.fr",
        nickname: "bob3",
        password:
          "$argon2i$v=19$m=4096,t=3,p=1$SKcpzKdXCrqY4RvImpFKBA$MCO99B5R/yVdICwkRph9lfBAqxeoMxEwppB65aTVSEs",
      },
    ]);

    const defaultUser = await mongoose.connection.models.User.findOne({
      email: "bob@bob.fr",
    });

    await mongoose.connection.models.Blog.create([
      {
        title: "DYSPEPSIA HEADACHE",
        description: "Restrict L Ext Iliac Vein w Intralum Dev, Perc",
        image_url: "http://dummyimage.com/138x214.png/ff4444/ffffff",
        article: "Lipidoses",
        isPublished: true,
        author: defaultUser._id,
      },
      {
        title: "Treatment Set TS350394",
        description:
          "Drainage of Left Lacrimal Bone, Perc Endo Approach, Diagn",
        image_url: "http://dummyimage.com/188x190.png/cc0000/ffffff",
        article: "Peripheral T cell lymphoma, spleen",
        isPublished: false,
        author: defaultUser._id,
      },
      {
        title: "Healing",
        description:
          "Insert of Intralum Dev into R Innom Vein, Perc Endo Approach",
        image_url: "http://dummyimage.com/189x221.bmp/dddddd/000000",
        article: "Mixed hearing loss, unilateral",
        isPublished: true,
        author: defaultUser._id,
      },
      {
        title: "Trout",
        description: "Supplement R Verteb Vein with Nonaut Sub, Open Approach",
        image_url: "http://dummyimage.com/180x149.bmp/5fa2dd/ffffff",

        article: "Abscess of salivary gland",
        isPublished: false,
        author: defaultUser._id,
      },
      {
        title: "Naltrexone Hydrochloride",
        description: "Change Packing Material on Left Hand",
        image_url: "http://dummyimage.com/127x172.png/ff4444/ffffff",

        article:
          "Need for prophylactic vaccination and inoculation against tuberculosis [BCG]",
        isPublished: true,
        author: defaultUser._id,
      },
      {
        title: "Bisoprolol Fumarate",
        description: "Bypass Gastric Vein to Low Vein w Synth Sub, Open",
        image_url: "http://dummyimage.com/186x136.jpg/ff4444/ffffff",

        article: "Open fracture of surgical neck of humerus",
        isPublished: false,
        author: defaultUser._id,
      },
      {
        title: "CataractClear",
        description: "Insertion of Ext Fix into L Humeral Head, Open Approach",
        image_url: "http://dummyimage.com/113x143.jpg/cc0000/ffffff",

        article: "Other degenerative disorders of globe",
        isPublished: true,
        author: defaultUser._id,
      },
      {
        title: "Health Mart Pharmacy Hydrocortisone",
        description: "Supplement Right Axilla with Synth Sub, Open Approach",
        image_url: "http://dummyimage.com/240x111.bmp/cc0000/ffffff",

        article: "Pulp degeneration",
        isPublished: false,
        author: defaultUser._id,
      },
      {
        title: "Alcohol Prep Pads",
        description: "Drainage of Jejunum, Open Approach, Diagnostic",
        image_url: "http://dummyimage.com/181x110.png/ff4444/ffffff",

        article: "Benign neoplasm of lymph nodes",
        isPublished: true,
        author: defaultUser._id,
      },
      {
        title: "equate daytime nitetime",
        description:
          "Dilate of R Ant Tib Art with 4+ Intralum Dev, Open Approach",
        image_url: "http://dummyimage.com/131x242.png/dddddd/000000",

        article:
          "Deep necrosis of underlying tissues [deep third degree] with loss of a body part, of chin",
        isPublished: true,
        author: defaultUser._id,
      },
      {
        title: "PREVNAR 13",
        description: "Drainage of Right Choroid with Drain Dev, Perc Approach",
        image_url: "http://dummyimage.com/248x211.bmp/dddddd/000000",

        article:
          "Mechanical failure of instrument or apparatus during unspecified procedure",
        isPublished: false,
        author: defaultUser._id,
      },
      {
        title: "Venlafaxine Hydrochloride",
        description: "Control Bleeding in Right Upper Arm, Perc Endo Approach",
        image_url: "http://dummyimage.com/117x176.bmp/dddddd/000000",

        article: "Mild nonproliferative diabetic retinopathy",
        isPublished: false,
        author: defaultUser._id,
      },
      {
        title: "Fresh Baby Scent Soothing Jelly",
        description:
          "Supplement R Foot Muscle with Autol Sub, Perc Endo Approach",
        image_url: "http://dummyimage.com/144x187.png/dddddd/000000",

        article: "Oligohydramnios, antepartum condition or complication",
        isPublished: false,
        author: defaultUser._id,
      },
      {
        title: "ShopRite Pain Relief PM",
        description:
          "Supplement L Glenoid Cav with Autol Sub, Perc Endo Approach",
        image_url: "http://dummyimage.com/242x138.png/cc0000/ffffff",

        article:
          "Spontaneous abortion, complicated by metabolic disorder, complete",
        isPublished: true,
        author: defaultUser._id,
      },
      {
        title: "Degree Girl Just Dance",
        description: "Occlusion R Ext Jugular Vein w Extralum Dev, Perc Endo",
        image_url: "http://dummyimage.com/239x164.bmp/cc0000/ffffff",

        article:
          "Infections of nipple associated with childbirth, postpartum condition or complication",
        isPublished: false,
        author: defaultUser._id,
      },
      {
        title: "Zarontin",
        description:
          "Dilation of L Axilla Art with Intralum Dev, Perc Approach",
        image_url: "http://dummyimage.com/141x236.png/cc0000/ffffff",

        article: "Injury to trigeminal nerve",
        isPublished: false,
        author: defaultUser._id,
      },
      {
        title: "VUMON",
        description: "Bypass R Axilla Art to L Extracran Art w Autol Art, Open",
        image_url: "http://dummyimage.com/150x115.bmp/5fa2dd/ffffff",

        article: "Benign neoplasm of rectum and anal canal",
        isPublished: false,
        author: defaultUser._id,
      },
      {
        title: "TOMMY GIRL ANTIPERSPIRANT",
        description: "Revision of Nonaut Sub in T-lum Jt, Perc Endo Approach",
        image_url: "http://dummyimage.com/219x236.bmp/cc0000/ffffff",

        article: "Closed dislocation of finger, unspecified part",
        isPublished: false,
        author: defaultUser._id,
      },
      {
        title: "ciprofloxacin",
        description: "Release Right Kidney, Percutaneous Approach",
        image_url: "http://dummyimage.com/218x134.jpg/dddddd/000000",

        article: "Infection of tracheostomy",
        isPublished: false,
        author: defaultUser._id,
      },
      {
        title: "Doxazosin",
        description: "Removal of Synth Sub from C-thor Jt, Open Approach",
        image_url: "http://dummyimage.com/201x168.jpg/ff4444/ffffff",

        article: "Chronic total occlusion of coronary artery",
        isPublished: true,
        author: defaultUser._id,
      },
      {
        title: "Metoprolol Tartrate",
        description: "Excision of Lower Back, Open Approach, Diagnostic",
        image_url: "http://dummyimage.com/230x181.png/ff4444/ffffff",

        article:
          "Combinations of opioid type drug with any other drug dependence, episodic",
        isPublished: false,
        author: defaultUser._id,
      },
      {
        title: "good sense antacid",
        description: "Extirpation of Matter from Nasal Septum, Perc Approach",
        image_url: "http://dummyimage.com/234x168.jpg/cc0000/ffffff",

        article: "Myogenic ptosis",
        isPublished: true,
        author: defaultUser._id,
      },
      {
        title: "Kids Crest",
        description:
          "Drainage of Cul-de-sac with Drainage Device, Open Approach",
        image_url: "http://dummyimage.com/100x231.png/5fa2dd/ffffff",

        article: "Wrist drop (acquired)",
        isPublished: true,
        author: defaultUser._id,
      },
      {
        title: "Egg Yolk",
        description:
          "Replace of Nasal Septum with Synth Sub, Perc Endo Approach",
        image_url: "http://dummyimage.com/103x250.jpg/cc0000/ffffff",

        article: "Other specified arthropod-borne viral diseases",
        isPublished: true,
        author: defaultUser._id,
      },
      {
        title: "Cover Fx Blemish Treatment Concealer N Deep",
        description: "Dilate Mid Colic Art, Bifurc, w 3 Drug-elut, Open",
        image_url: "http://dummyimage.com/139x102.jpg/cc0000/ffffff",

        article:
          "Tuberculosis of intrathoracic lymph nodes, bacteriological or histological examination not done",
        isPublished: true,
        author: defaultUser._id,
      },
      {
        title: "SHISEIDO THE SKINCARE TINTED MOISTURE PROTECTION",
        description:
          "Extirpation of Matter from Left Renal Artery, Open Approach",
        image_url: "http://dummyimage.com/215x108.bmp/dddddd/000000",

        article: "Dermatitis due to unspecified substance taken internally",
        isPublished: false,
        author: defaultUser._id,
      },
      {
        title: "Cultivated Oat",
        description: "Excision of Right Ventricle, Percutaneous Approach",
        image_url: "http://dummyimage.com/130x134.png/ff4444/ffffff",

        article: "Open fracture of C1-C4 level with anterior cord syndrome",
        isPublished: false,
        author: defaultUser._id,
      },
      {
        title: "SEROQUEL",
        description: "Occlusion R Up Lobe Bronc w Intralum Dev, Perc Endo",
        image_url: "http://dummyimage.com/153x215.jpg/cc0000/ffffff",

        article: "Tuberculosis of thyroid gland, unspecified",
        isPublished: false,
        author: defaultUser._id,
      },
      {
        title: "Alprazolam",
        description: "Supplement L Temporal Bone w Autol Sub, Perc Endo",
        image_url: "http://dummyimage.com/130x171.bmp/ff4444/ffffff",

        article: "Personal history of poisoning, presenting hazards to health",
        isPublished: false,
        author: defaultUser._id,
      },

      {
        title: "Isosorbide Dinitrate",
        description: "Release Right Upper Arm Tendon, Percutaneous Approach",
        image_url: "http://dummyimage.com/117x193.bmp/cc0000/ffffff",

        article: "Burkitt's tumor or lymphoma, spleen",
        isPublished: true,
        author: defaultUser._id,
      },
      {
        title:
          "TERRACOTTA JOLI TEINT BEAUTIFYING FOUNDATION WITH SUNSCREEN SUN-KISSED, HEALTHY GLOW BROAD SPECTRUM SPF 20 NATURAL",
        description: "Fluoroscopy of Ileal Diversion Loop using L Osm Contrast",
        image_url: "http://dummyimage.com/203x157.png/cc0000/ffffff",

        article:
          "Tuberculosis of lung with cavitation, tubercle bacilli found (in sputum) by microscopy",
        isPublished: false,
        author: defaultUser._id,
      },
      {
        title: "Nighttime Sleep Aid",
        description: "Remove Tissue Expander from Up Extrem Subcu/Fascia, Perc",
        image_url: "http://dummyimage.com/108x248.jpg/ff4444/ffffff",

        article:
          '"Light-for-dates"without mention of fetal malnutrition, 1,250- 1,499 grams',
        isPublished: true,
        author: defaultUser._id,
      },
      {
        title: "Gianvi",
        description: "Change Other Device in Brain, External Approach",
        image_url: "http://dummyimage.com/189x163.png/ff4444/ffffff",

        article:
          "Illegally induced abortion, complicated by embolism, complete",
        isPublished: false,
        author: defaultUser._id,
      },
      {
        title: "PURIFIED WATER",
        description: "Removal of Drain Dev from Tracheobronc Tree, Via Opening",
        image_url: "http://dummyimage.com/139x181.png/cc0000/ffffff",

        article:
          "Nervous system complications from surgically implanted device",
        isPublished: true,
        author: defaultUser._id,
      },
      {
        title: "Losartan Potassium",
        description: "Excision of Esophagus, Via Opening, Diagn",
        image_url: "http://dummyimage.com/101x123.png/5fa2dd/ffffff",

        article:
          "Unspecified adverse effect of other drug, medicinal and biological substance",
        isPublished: false,
        author: defaultUser._id,
      },
      {
        title: "Banana Boat Deep Tanning Dry SPF 8",
        description: "Replace R Thumb Phalanx w Autol Sub, Perc Endo",
        image_url: "http://dummyimage.com/145x196.jpg/5fa2dd/ffffff",

        article: "Open wound of nose, unspecified site, complicated",
        isPublished: false,
        author: defaultUser._id,
      },
      {
        title: "Daysee",
        description:
          "Dilation of Right Hand Artery, Bifurcation, Open Approach",
        image_url: "http://dummyimage.com/189x209.bmp/ff4444/ffffff",

        article:
          "Nonspecific (abnormal) findings on radiological and other examination of abdominal area, including retroperitoneum",
        isPublished: false,
        author: defaultUser._id,
      },
      {
        title: "Cyanocobalamin",
        description: "Removal of Autol Sub from Lum Disc, Perc Endo Approach",
        image_url: "http://dummyimage.com/140x222.png/5fa2dd/ffffff",

        article:
          "Nephritis and nephropathy, not specified as acute or chronic, with lesion of rapidly progressive glomerulonephritis",
        isPublished: false,
        author: defaultUser._id,
      },
      {
        title: "Vineyard Antibacterial Foaming Hand Wash",
        description:
          "Drainage of Upper Artery, Percutaneous Approach, Diagnostic",
        image_url: "http://dummyimage.com/226x248.bmp/dddddd/000000",

        article: "Toxoplasmosis of other specified sites",
        isPublished: true,
        author: defaultUser._id,
      },
      {
        title: "Coppertone ultraGUARD Sunscreen",
        description: "Removal of Synthetic Substitute from Vas Deferens, Endo",
        image_url: "http://dummyimage.com/146x212.jpg/dddddd/000000",

        article: "Open wound of wrist, complicated",
        isPublished: false,
        author: defaultUser._id,
      },
      {
        title: "Ciprofloxacin",
        description: "Restrict Esophagast Junct w Extralum Dev, Perc Endo",
        image_url: "http://dummyimage.com/155x185.bmp/ff4444/ffffff",

        article:
          "Amniotic fluid embolism, delivered, with mention of postpartum complication",
        isPublished: true,
        author: defaultUser._id,
      },
      {
        title: "Duet DHA",
        description: "Revision of Synth Sub in L Pelvic Bone, Extern Approach",
        image_url: "http://dummyimage.com/193x103.jpg/5fa2dd/ffffff",

        article: "Hypertrophy of tongue papillae",
        isPublished: true,
        author: defaultUser._id,
      },
      {
        title: "Amoxicillin and Clavulanate Potassium",
        description:
          "Supplement Upper Artery with Synth Sub, Perc Endo Approach",
        image_url: "http://dummyimage.com/203x190.bmp/dddddd/000000",

        article:
          "Injury to other intra-abdominal organs with open wound into cavity, unspecified intra-abdominal organ",
        isPublished: false,
        author: defaultUser._id,
      },
      {
        title: "Bethanechol Chloride",
        description: "Removal of Int Fix from L Low Femur, Extern Approach",
        image_url: "http://dummyimage.com/185x116.jpg/ff4444/ffffff",

        article:
          "Other noncollision motor vehicle traffic accident injuring unspecified person",
        isPublished: false,
        author: defaultUser._id,
      },
      {
        title: "Health Mart fexofenadine hydrochloride",
        description: "Detachment at Right Thumb, High, Open Approach",
        image_url: "http://dummyimage.com/163x165.bmp/dddddd/000000",
        article: "Mechanical loosening of prosthetic joint",
        isPublished: true,
        author: defaultUser._id,
      },
      {
        title: "POA ANNUA POLLEN",
        description:
          "Replacement of R Com Iliac Art with Synth Sub, Open Approach",
        image_url: "http://dummyimage.com/154x136.png/dddddd/000000",
        article:
          "Spontaneous abortion, complicated by genital tract and pelvic infection, unspecified",
        isPublished: true,
        author: defaultUser._id,
      },
      {
        title:
          "LOreal Paris Men Expert Vita Lift Daily Moisturizer Sunscreen Broad Spectrum SPF 15",
        description: "Supplement R Low Leg Muscle w Nonaut Sub, Perc Endo",
        image_url: "http://dummyimage.com/103x242.bmp/cc0000/ffffff",
        article: "Pulmonary alveolar proteinosis",
        isPublished: false,
        author: defaultUser._id,
      },
      {
        title: "Phenobarbital",
        description: "Revise Infusion Dev in R Metacarpocarp Jt, Extern",
        image_url: "http://dummyimage.com/160x122.jpg/ff4444/ffffff",
        article: "Open fracture of first cervical vertebra",
        isPublished: true,
        author: defaultUser._id,
      },
      {
        title: "California Mugwort",
        description:
          "Replace of R Mandible with Nonaut Sub, Perc Endo Approach",
        image_url: "http://dummyimage.com/183x196.bmp/5fa2dd/ffffff",
        article: "Closed fracture of six ribs",
        isPublished: false,
        author: defaultUser._id,
      },
      {
        title: "Proactiv",
        description:
          "Bypass L Atrium to R Pulm Art with Autol Vn, Open Approach",
        image_url: "http://dummyimage.com/153x199.jpg/5fa2dd/ffffff",
        article:
          "Cardiac catheterization as the cause of abnormal reaction of patient, or of later complication, without mention of misadventure at time of procedure",
        isPublished: true,
        author: defaultUser._id,
      },
    ]);
  } catch (err) {
    console.log(err);
  }
};

beforeAll(async () => {
  try {
    seedDB();
    await mongoose.connect(
      "mongodb://localhost:27017/testpro",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      },
      (err) => {
        if (err) {
          console.error(err.message);
          process.exit(1);
        }
        return "error";
      }
    );
  } catch (err) {
    console.log(err);
  }
});

const clearDB = async () => {
  try {
    const testpro = ["users", "blogs"];
    testpro.forEach(async (key) => {
      await mongoose.connection.collections[key].deleteMany({});
    });
  } catch (err) {
    console.log(err);
  }
};

afterAll(() => {
  clearDB();
});
