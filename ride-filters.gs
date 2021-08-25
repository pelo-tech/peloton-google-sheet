function getRideFilters(){
 return ride_filters.filters;
}

// Class Filters from the /rides/filters  for cycling on-demand classes
// /api/ride/filters?library_type=on_demand&browse_category=cycling&include_icon_images=true
var ride_filters = {
  "filters": [
    {
      "name": "is_favorite_ride",
      "display_name": "Bookmarked",
      "type": "toggle",
      "user_specific": true,
      "values": [
        {
          "value": "true",
          "display_name": "Bookmarked",
          "list_order": null,
          "display_image_url": "https://s3.amazonaws.com/static-cdn.pelotoncycle.com/filter-icons/bookmarked_new.png"
        },
        {
          "value": "false",
          "display_name": "Not Bookmarked",
          "list_order": null
        }
      ]
    },
    {
      "name": "class_type_id",
      "display_name": "Class Type",
      "type": "collection",
      "user_specific": false,
      "values": [
        {
          "value": "57dbf6f9a4904a9f80e302380855bdb7",
          "display_name": "Warm Up/Cool Down",
          "list_order": 1
        },
        {
          "value": "9f9be657134e4d868d76ae4988da01f1",
          "display_name": "Beginner",
          "list_order": 69
        },
        {
          "value": "59a49f882ea9475faa3110d50a8fb3f3",
          "display_name": "Low Impact",
          "list_order": 70
        },
        {
          "value": "665395ff3abf4081bf315686227d1a51",
          "display_name": "Power Zone",
          "list_order": 71
        },
        {
          "value": "bf6639f2e50a4f0395cb1479542ed4bd",
          "display_name": "Climb",
          "list_order": 72
        },
        {
          "value": "a2ee6b0a98e2431baf60e5261b8605e2",
          "display_name": "Live DJ",
          "list_order": 73
        },
        {
          "value": "7579b9edbdf9464fa19eb58193897a73",
          "display_name": "Intervals",
          "list_order": 74
        },
        {
          "value": "8c34b36dba084e22b91426621759230d",
          "display_name": "Heart Rate Zone",
          "list_order": 75
        },
        {
          "value": "f10471dcd6a34e5f8ed54eb634b5df19",
          "display_name": "Theme",
          "list_order": 76
        },
        {
          "value": "c87e20095d80463db5ce04df7fe2b989",
          "display_name": "Music",
          "list_order": 77
        },
        {
          "value": "9745b8e2cb274a28b096387073a5d993",
          "display_name": "Groove",
          "list_order": 78
        },
        {
          "value": "4228e9e57bf64c518d58a1d0181760c4",
          "display_name": "Pro Cyclist",
          "list_order": 80
        }
      ]
    },
    {
      "name": "content_group",
      "display_name": "Content Group",
      "type": "collection",
      "user_specific": false,
      "values": [
        {
          "value": "classes",
          "display_name": "Peloton Classes",
          "list_order": 0
        }
      ]
    },
    {
      "name": "content_provider",
      "display_name": "Content Provider",
      "type": "collection",
      "user_specific": false,
      "values": [
        {
          "value": "peloton",
          "display_name": "Peloton",
          "list_order": 0
        }
      ]
    },
    {
      "name": "duration",
      "display_name": "Length",
      "type": "collection",
      "user_specific": false,
      "values": [
        {
          "value": "300",
          "display_name": "5 min",
          "list_order": 0
        },
        {
          "value": "600",
          "display_name": "10 min",
          "list_order": 1
        },
        {
          "value": "900",
          "display_name": "15 min",
          "list_order": 2
        },
        {
          "value": "1200",
          "display_name": "20 min",
          "list_order": 3
        },
        {
          "value": "1800",
          "display_name": "30 min",
          "list_order": 4
        },
        {
          "value": "2700",
          "display_name": "45 min",
          "list_order": 5
        },
        {
          "value": "3600",
          "display_name": "60 min",
          "list_order": 6
        },
        {
          "value": "4500",
          "display_name": "75 min",
          "list_order": 7
        },
        {
          "value": "5400",
          "display_name": "90 min",
          "list_order": 8
        }
      ]
    },
    {
      "name": "instructor_id",
      "display_name": "Instructor",
      "type": "collection",
      "user_specific": false,
      "values": [
        {
          "value": "2e57092bee334c8c8dcb9fe16ba5308c",
          "display_name": "Alex Toussaint",
          "list_order": 23,
          "display_image_url": "https://s3.amazonaws.com/workout-metric-images-prod/108e25fac8a04d709c61e7df39a0d5d6"
        },
        {
          "value": "731d7b7f6b414a49892c21f01e25317d",
          "display_name": "Ally Love",
          "list_order": 24,
          "display_image_url": "https://s3.amazonaws.com/workout-metric-images-prod/85182219e21c43b39aa1251dd8f12adb"
        },
        {
          "value": "7f3de5e78bb44d8591a0f77f760478c3",
          "display_name": "Ben Alldis",
          "list_order": 27,
          "display_image_url": "https://s3.amazonaws.com/workout-metric-images-prod/4aa24c3fba07458f8084df128df4f979"
        },
        {
          "value": "01f636dc54a145239c4348e1736684ee",
          "display_name": "Bradley Rose",
          "list_order": 28,
          "display_image_url": "https://s3.amazonaws.com/workout-metric-images-prod/dfff95abccd045ac87db396119d6395f"
        },
        {
          "value": "e2e6586d898d4422b3f6e3a259ff3f90",
          "display_name": "Cliff Dwenger",
          "list_order": 31,
          "display_image_url": "https://s3.amazonaws.com/workout-metric-images-prod/33cdc9c491e14269902fa1db7dc1b8b2"
        },
        {
          "value": "5a19bfe66e644a2fa3e6387a91ebc5ce",
          "display_name": "Christine D'Ercole",
          "list_order": 33,
          "display_image_url": "https://s3.amazonaws.com/workout-metric-images-prod/ae9583fbef064dce92b91b5c6e3034eb"
        },
        {
          "value": "baf5dfb4c6ac4968b2cb7f8f8cc0ef10",
          "display_name": "Cody Rigsby",
          "list_order": 34,
          "display_image_url": "https://s3.amazonaws.com/workout-metric-images-prod/50b3d98e87f446f3b2e6dfde4d87b42d"
        },
        {
          "value": "1e59e949a19341539214a4a13ea7ff01",
          "display_name": "Denis Morton",
          "list_order": 35,
          "display_image_url": "https://s3.amazonaws.com/workout-metric-images-prod/e663f5068ac240be8665feb18322bae2"
        },
        {
          "value": "f6f2d613dc344e4bbf6428cd34697820",
          "display_name": "Emma Lovewell",
          "list_order": 36,
          "display_image_url": "https://s3.amazonaws.com/workout-metric-images-prod/aab0bbd729f94be0b835d08507410eea"
        },
        {
          "value": "017dd08b095346979ddf761eb49f9f67",
          "display_name": "Erik Jäger",
          "list_order": 37,
          "display_image_url": "https://s3.amazonaws.com/workout-metric-images-prod/1c25546a3c85432b9f64fe28eae557dd"
        },
        {
          "value": "561f95c405734d8488ed8dcc8980d599",
          "display_name": "Hannah Corbin",
          "list_order": 38,
          "display_image_url": "https://s3.amazonaws.com/workout-metric-images-prod/89edbd70efa446999ae4c48ef8717aed"
        },
        {
          "value": "3ff679ebbd324c83a8ab6cfa6bb4be37",
          "display_name": "Hannah Frankson",
          "list_order": 39,
          "display_image_url": "https://s3.amazonaws.com/workout-metric-images-prod/1c61d496cffd4256ab9f172a24860f60"
        },
        {
          "value": "51702da3a4684b988d31d89eebb43175",
          "display_name": "Jenn Sherman",
          "list_order": 40,
          "display_image_url": "https://s3.amazonaws.com/workout-metric-images-prod/d3b576fe8e284ef6b60709ff0238fc6e"
        },
        {
          "value": "048f0ce00edb4427b2dced6cbeb107fd",
          "display_name": "Jess King",
          "list_order": 42,
          "display_image_url": "https://s3.amazonaws.com/workout-metric-images-prod/f94160a5f6e14445840c8f60b5f86ae8"
        },
        {
          "value": "4904612965164231a37143805a387e40",
          "display_name": "Kendall Toole",
          "list_order": 43,
          "display_image_url": "https://s3.amazonaws.com/workout-metric-images-prod/63cd471dddd6423294737112b32a8b78"
        },
        {
          "value": "c0a9505d8135412d824cf3c97406179b",
          "display_name": "Leanne Hainsby",
          "list_order": 46,
          "display_image_url": "https://s3.amazonaws.com/workout-metric-images-prod/065e607d145944309aef36f99a0e7a68"
        },
        {
          "value": "304389e2bfe44830854e071bffc137c9",
          "display_name": "Matt Wilpers",
          "list_order": 49,
          "display_image_url": "https://s3.amazonaws.com/workout-metric-images-prod/1828d7105e1f4f44b8a95fe316405357"
        },
        {
          "value": "0e836f86aa9c488782452243f2e17170",
          "display_name": "Mayla Wedekind",
          "list_order": 51,
          "display_image_url": "https://s3.amazonaws.com/workout-metric-images-prod/d391ab482a014847b571239f421a4217"
        },
        {
          "value": "05735e106f0747d2a112d32678be8afd",
          "display_name": "Olivia Amato",
          "list_order": 53,
          "display_image_url": "https://s3.amazonaws.com/workout-metric-images-prod/8707d2315f154958be8c91776fedf20a"
        },
        {
          "value": "c406f36aa2a44a5baf8831f8b92f6920",
          "display_name": "Robin Arzón",
          "list_order": 56,
          "display_image_url": "https://s3.amazonaws.com/workout-metric-images-prod/98f012dc8a774a6a92f45c26d208a643"
        },
        {
          "value": "4672db841da0495caf4b8f9cda405512",
          "display_name": "Sam Yo",
          "list_order": 58,
          "display_image_url": "https://s3.amazonaws.com/workout-metric-images-prod/fc452163352a466c91a8dcc26e9a182d"
        },
        {
          "value": "c9bd86e59b9b4f96981848467838aa9c",
          "display_name": "Tunde Oyeneyin",
          "list_order": 60,
          "display_image_url": "https://s3.amazonaws.com/workout-metric-images-prod/2ea104ad84b64d3b9a27e7748c7ca1a7"
        },
        {
          "value": "9c67c1b94e5d4ad5a1cbe439ac62eb75",
          "display_name": "Irène Scholz",
          "list_order": 61,
          "display_image_url": "https://s3.amazonaws.com/workout-metric-images-prod/af888565faa94a55a9cb4731db44d715"
        },
        {
          "value": "35016225e39d46dbbc364991ab48e10f",
          "display_name": "Christian Vande Velde",
          "list_order": 62,
          "display_image_url": "https://workout-metric-images-prod.s3.amazonaws.com/e92a4616ae3f4ee3837a710facd34369"
        }
      ]
    },
    {
      "name": "language",
      "display_name": "Language",
      "type": "collection",
      "user_specific": false,
      "values": [
        {
          "value": "english",
          "display_name": "English",
          "list_order": 0
        }
      ]
    },
    {
      "name": "location",
      "display_name": "Location",
      "type": "collection",
      "user_specific": false,
      "values": [
        {
          "value": "rehearsal-uk-bike-remote",
          "display_name": "rehearsal-uk-bike-remote",
          "list_order": 0
        },
        {
          "value": "event-01",
          "display_name": "Special Event ",
          "list_order": 0
        },
        {
          "value": "nyc",
          "display_name": "New York City",
          "list_order": 1
        },
        {
          "value": "psny-studio-1",
          "display_name": "PSNY Studio 1",
          "list_order": 2
        },
        {
          "value": "uk",
          "display_name": "Interim Studio",
          "list_order": 3
        },
        {
          "value": "uk-bike-remote-broadcast",
          "display_name": "UK-Bike-Remote-Broadcast",
          "list_order": 4
        },
        {
          "value": "us-bike-remote-broadcast",
          "display_name": "US-Bike-Remote-Broadcast",
          "list_order": 5
        }
      ]
    },
    {
      "name": "is_following_user_ride",
      "display_name": "Taken by Friends",
      "type": "toggle",
      "user_specific": true,
      "values": [
        {
          "value": "true",
          "display_name": "Taken by Friends",
          "list_order": null
        },
        {
          "value": "false",
          "display_name": "Not Taken by Friends",
          "list_order": null
        }
      ]
    },
    {
      "name": "has_workout",
      "display_name": "Taken by Me",
      "type": "toggle",
      "user_specific": true,
      "values": [
        {
          "value": "true",
          "display_name": "Taken by Me",
          "list_order": null,
          "display_image_url": "https://s3.amazonaws.com/static-cdn.pelotoncycle.com/filter-icons/taken_yes.png"
        },
        {
          "value": "false",
          "display_name": "Not Taken by Me",
          "list_order": null,
          "display_image_url": "https://s3.amazonaws.com/static-cdn.pelotoncycle.com/filter-icons/taken_no.png"
        }
      ],
      "display_hint": "tri-state"
    },
    {
      "name": "caption_locales",
      "display_name": "Subtitles",
      "type": "collection",
      "user_specific": false,
      "values": [
        {
          "value": "en-US",
          "display_name": "English",
          "list_order": 0
        },
        {
          "value": "de-DE",
          "display_name": "German",
          "list_order": 1
        },
        {
          "value": "es-ES",
          "display_name": "Spanish",
          "list_order": 2
        }
      ]
    },
    {
      "name": "super_genre_id",
      "display_name": "Music",
      "type": "collection",
      "user_specific": false,
      "values": [
        {
          "value": "85ca9f28a03e4bdc970447de368b0219",
          "display_name": "Alternative",
          "list_order": 0
        },
        {
          "value": "7afdd1462d474005841e9a6a403229f1",
          "display_name": "Classic Rock",
          "list_order": 1
        },
        {
          "value": "5ab996597f564959afcc0c24a90e28e5",
          "display_name": "Country",
          "list_order": 2
        },
        {
          "value": "3ee05f39e1dd477facbb9ac8c27c89c3",
          "display_name": "Electronic",
          "list_order": 3
        },
        {
          "value": "c9d4dee696b04477afc88aa22285025f",
          "display_name": "Hip Hop",
          "list_order": 4
        },
        {
          "value": "531baed4112042ee98ea72f1030c40d0",
          "display_name": "Indie",
          "list_order": 5
        },
        {
          "value": "a6620457f6fe48439fb746e5b0731f79",
          "display_name": "Latin",
          "list_order": 6
        },
        {
          "value": "6bb65ad0b1f64a639ab91e179f969e7d",
          "display_name": "Pop",
          "list_order": 7
        },
        {
          "value": "3c04c80b103043ebb5c9d23e1ad68c52",
          "display_name": "R&B",
          "list_order": 8
        },
        {
          "value": "c06217bbe61f485094cfe62d098b3bf8",
          "display_name": "Rock",
          "list_order": 9
        }
      ]
    },
    {
      "name": "ride_type_id",
      "display_name": "Class Type",
      "type": "collection",
      "user_specific": false,
      "values": [
        {
          "value": "57dbf6f9a4904a9f80e302380855bdb7",
          "display_name": "Warm Up/Cool Down",
          "list_order": 1
        },
        {
          "value": "9f9be657134e4d868d76ae4988da01f1",
          "display_name": "Beginner",
          "list_order": 69
        },
        {
          "value": "59a49f882ea9475faa3110d50a8fb3f3",
          "display_name": "Low Impact",
          "list_order": 70
        },
        {
          "value": "665395ff3abf4081bf315686227d1a51",
          "display_name": "Power Zone",
          "list_order": 71
        },
        {
          "value": "bf6639f2e50a4f0395cb1479542ed4bd",
          "display_name": "Climb",
          "list_order": 72
        },
        {
          "value": "a2ee6b0a98e2431baf60e5261b8605e2",
          "display_name": "Live DJ",
          "list_order": 73
        },
        {
          "value": "7579b9edbdf9464fa19eb58193897a73",
          "display_name": "Intervals",
          "list_order": 74
        },
        {
          "value": "8c34b36dba084e22b91426621759230d",
          "display_name": "Heart Rate Zone",
          "list_order": 75
        },
        {
          "value": "f10471dcd6a34e5f8ed54eb634b5df19",
          "display_name": "Theme",
          "list_order": 76
        },
        {
          "value": "c87e20095d80463db5ce04df7fe2b989",
          "display_name": "Music",
          "list_order": 77
        },
        {
          "value": "9745b8e2cb274a28b096387073a5d993",
          "display_name": "Groove",
          "list_order": 78
        },
        {
          "value": "4228e9e57bf64c518d58a1d0181760c4",
          "display_name": "Pro Cyclist",
          "list_order": 80
        }
      ]
    }
  ],
  "sorts": [
    {
      "value": {
        "sort": "original_air_time",
        "desc": true
      },
      "display_name": "New",
      "slug": "new"
    },
    {
      "value": {
        "sort": "trending",
        "desc": true
      },
      "display_name": "Trending",
      "slug": "trending"
    },
    {
      "value": {
        "sort": "popularity",
        "desc": true
      },
      "display_name": "Popular",
      "slug": "popular"
    },
    {
      "value": {
        "sort": "top_rated",
        "desc": true
      },
      "display_name": "Top Rated",
      "slug": "top_rated"
    },
    {
      "value": {
        "sort": "difficulty",
        "desc": false
      },
      "display_name": "Easiest",
      "slug": "easiest"
    },
    {
      "value": {
        "sort": "difficulty",
        "desc": true
      },
      "display_name": "Hardest",
      "slug": "hardest"
    }
  ]
};
