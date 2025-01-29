// src/app/actions/post_action.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Fetch posts from the database
export async function getPosts() {
  try {
    // Query the database to fetch users and their posts
    const posts = await prisma.user.findMany({
      include: {
        posts: true, // Include posts for each user
      },
    });

    // Map the data to a desired format (if needed)
    const userData = posts.map((user) => ({
      name: user.name,
      posts: user.posts.map((post) => ({
        id: post.id,
        imageUrl: post.imageUrl,
        caption: post.caption,
      })),
    }));

    return userData;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Error fetching posts");
  } finally {
    await prisma.$disconnect(); // Ensure the Prisma client is disconnected
  }
}

// Alright so first off i created the following file structure in my root directory:
// prisma/seedData/dbInject.ts/seed-data.json 
// this, to my understanding seeds the data .json data from seed-data.json into my prisma database using dbInject.ts.

// This is what dbInject.ts looks like:
//  // npm install --save-dev tsx

// // npx tsx prisma/seedData/dbInject.ts


// import fs from 'fs';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// async function seed() {
//     const data = JSON.parse(fs.readFileSync('prisma/seedData/seed-data.json', 'utf8'));

//   // Insert Users, Profiles, and Posts into your DB
//   // Because of relations, we can create them in the correct order or use createMany.
//   for (const item of data) {
//     // Create user
//     const createdUser = await prisma.user.create({
//       data: {
//         id: item.id,
//         name: item.name,
//         email: item.email,
//         emailVerified: item.emailVerified,
//         image: item.image,
//         createdAt: item.createdAt,
//         updatedAt: item.updatedAt
//       }
//     });

//     // Create profile
//     if (item.profile) {
//       await prisma.profile.create({
//         data: {
//           id: item.profile.id,
//           userId: item.profile.userId,
//           bio: item.profile.bio,
//           avatarUrl: item.profile.avatarUrl,
//           location: item.profile.location,
//           interests: item.profile.interests,
//           createdAt: item.profile.createdAt,
//           updatedAt: item.profile.updatedAt
//         }
//       });
//     }

//     // Create posts
//     if (item.posts && item.posts.length > 0) {
//       await prisma.post.createMany({
//         data: item.posts.map((p: any) => ({
//           id: p.id,
//           userId: p.userId,
//           imageUrl: p.imageUrl,
//           caption: p.caption,
//           createdAt: p.createdAt,
//           updatedAt: p.updatedAt
//         }))
//       });
//     }
//   }

//   console.log('Database seeded successfully!');
// }

// seed().catch((e) => {
//   console.error(e);
//   process.exit(1);
// });

// This is what seed-data.json looks like:
// [
//     {
//       "name": "Dr. Pete Steuber",
//       "email": "Pierre_Bogisich86@yahoo.com",
//       "emailVerified": "2025-03-19T20:21:49.612Z",
//       "image": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/93.jpg",
//       "updatedAt": "2025-01-14T08:29:33.887Z",
//       "id": "a4ec5b2a-8bba-4169-9735-260453bbcf5f",
//       "profile": {
//         "bio": "Depopulo vere combibo delectatio ulciscor id adulescens enim. Convoco desolo contego color catena brevis tamen tum. Curtus usque concedo tamquam articulus toties amplus ventus ater.",
//         "avatarUrl": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/614.jpg",
//         "location": "Oswaldmouth",
//         "updatedAt": "2025-02-21T01:14:58.255Z",
//         "id": "6e2e777f-9385-4932-956a-8f34eca57a21",
//         "userId": "a4ec5b2a-8bba-4169-9735-260453bbcf5f"
//       },
//       "posts": [
//         {
//           "imageUrl": "https://picsum.photos/seed/BmGK7/640/480",
//           "caption": "Utilis expedita titulus auditor conor thorax altus.",
//           "updatedAt": "2024-11-17T21:31:07.461Z",
//           "id": "5331339d-7a59-43a5-b1fb-fa5475063b28",
//           "userId": "a4ec5b2a-8bba-4169-9735-260453bbcf5f"
//         },
//         {
//           "imageUrl": "https://loremflickr.com/640/480?lock=4129215161040896",
//           "caption": "Beneficium verto vehemens excepturi.",
//           "updatedAt": "2025-04-16T19:49:55.535Z",
//           "id": "f437a164-405c-4993-bf28-1370e6688f49",
//           "userId": "a4ec5b2a-8bba-4169-9735-260453bbcf5f"
//         },
//         {
//           "imageUrl": "https://picsum.photos/seed/GQQUjMeycU/640/480",
//           "caption": "Volaticus antea strenuus eos textus urbanus et vilis amissio.",
//           "updatedAt": "2024-05-07T19:32:59.433Z",
//           "id": "8bf3f273-61c6-4119-9575-633a0e435e58",
//           "userId": "a4ec5b2a-8bba-4169-9735-260453bbcf5f"
//         }
//       ]
//     },
//     {
//       "name": "Dr. Opal Murray",
//       "email": "Ocie_Steuber78@yahoo.com",
//       "emailVerified": "2025-05-13T20:35:09.108Z",
//       "image": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/982.jpg",
//       "updatedAt": "2025-06-15T02:18:19.711Z",
//       "id": "c6844753-1afa-46c9-81a1-4549da9a279d",
//       "profile": {
//         "bio": "Nihil minima clementia nobis avarus vulgivagus censura. Vos copiose tego stips theatrum speculum angulus acquiro. Debeo adipisci vulnero sodalitas accusamus triumphus adfero sequi substantia virgo.",
//         "avatarUrl": "https://avatars.githubusercontent.com/u/40319535",
//         "location": "New Generalmouth",
//         "updatedAt": "2024-11-30T02:12:04.495Z",
//         "id": "68fffe38-6ffd-4690-bb7a-446d6b86ac40",
//         "userId": "c6844753-1afa-46c9-81a1-4549da9a279d"
//       },
//       "posts": [
//         {
//           "imageUrl": "https://loremflickr.com/640/480?lock=3939162537328640",
//           "caption": "Ver demum verumtamen tot sodalitas talio cernuus.",
//           "updatedAt": "2024-01-29T09:48:12.756Z",
//           "id": "3ec6aa65-4323-4be7-9b3f-f91f58aa5f42",
//           "userId": "c6844753-1afa-46c9-81a1-4549da9a279d"
//         },
//         {
//           "imageUrl": "https://picsum.photos/seed/eNdmcJYt/640/480",
//           "caption": "Dolores ater adicio atrocitas.",
//           "updatedAt": "2025-11-13T23:25:59.595Z",
//           "id": "8929ce8c-e1ea-4bef-87e9-d89b2527267b",
//           "userId": "c6844753-1afa-46c9-81a1-4549da9a279d"
//         },
//         {
//           "imageUrl": "https://picsum.photos/seed/IfpFm8ux/640/480",
//           "caption": "Vulariter agnitio victoria cibo sumptus argentum.",
//           "updatedAt": "2024-07-09T01:02:31.044Z",
//           "id": "5ff88d13-badf-4c4a-9af0-03b974b47685",
//           "userId": "c6844753-1afa-46c9-81a1-4549da9a279d"
//         }
//       ]
//     },
//     {
//       "name": "Christina Leffler",
//       "email": "General37@hotmail.com",
//       "emailVerified": "2024-01-10T21:02:38.122Z",
//       "image": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/768.jpg",
//       "updatedAt": "2024-04-24T21:58:41.044Z",
//       "id": "43f5a8dc-315d-4ae5-9ac5-192abe5428cd",
//       "profile": {
//         "bio": "Adipisci altus animus ara audeo blandior omnis consectetur vos patria. Hic communis pecto claro adficio statua blanditiis. Alter urbs recusandae.",
//         "avatarUrl": "https://avatars.githubusercontent.com/u/75856878",
//         "location": "Marcelofield",
//         "updatedAt": "2024-07-02T21:05:37.958Z",
//         "id": "94862c09-d388-403e-9295-57471434006e",
//         "userId": "43f5a8dc-315d-4ae5-9ac5-192abe5428cd"
//       },
//       "posts": [
//         {
//           "imageUrl": "https://picsum.photos/seed/wHAP3c/640/480",
//           "caption": "Aestivus tot totus demulceo bestia pecto vomer delicate tepesco stultus.",
//           "updatedAt": "2024-05-31T16:08:38.786Z",
//           "id": "271762c5-6c9f-4a69-bf98-65bd09c6700a",
//           "userId": "43f5a8dc-315d-4ae5-9ac5-192abe5428cd"
//         },
//         {
//           "imageUrl": "https://loremflickr.com/640/480?lock=1861847357587456",
//           "caption": "Volaticus torrens curiositas nam vesco utilis deinde spargo ustilo.",
//           "updatedAt": "2024-03-05T21:01:22.458Z",
//           "id": "732ca0da-8897-44c4-872d-0832b3f2ba3f",
//           "userId": "43f5a8dc-315d-4ae5-9ac5-192abe5428cd"
//         },
//         {
//           "imageUrl": "https://picsum.photos/seed/cfqTGkNqN/640/480",
//           "caption": "Canonicus autus adsuesco templum accusamus clarus allatus pectus clementia.",
//           "updatedAt": "2025-09-15T19:56:56.759Z",
//           "id": "73bc981e-054b-44f9-8285-7c35385641d5",
//           "userId": "43f5a8dc-315d-4ae5-9ac5-192abe5428cd"
//         }
//       ]
//     },
//     {
//       "name": "Ms. Candace Jacobi",
//       "email": "Keshawn40@yahoo.com",
//       "emailVerified": "2024-05-08T12:54:32.807Z",
//       "image": "https://avatars.githubusercontent.com/u/9264671",
//       "updatedAt": "2024-08-15T01:09:36.541Z",
//       "id": "d91b10cf-e945-43c8-a1a9-b401ddd52986",
//       "profile": {
//         "bio": "Concedo tego cena. Vitae venustas ago beatae cenaculum dignissimos repellat. Corroboro alias cilicium vicissitudo caterva sumptus.",
//         "avatarUrl": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/370.jpg",
//         "location": "East Lemuelport",
//         "updatedAt": "2023-12-28T03:19:39.464Z",
//         "id": "bf338cc3-bffa-4e5d-932c-ccc7ca91faf8",
//         "userId": "d91b10cf-e945-43c8-a1a9-b401ddd52986"
//       },
//       "posts": [
//         {
//           "imageUrl": "https://loremflickr.com/640/480?lock=4058183637139456",
//           "caption": "Tubineus certus molestias chirographum verumtamen uterque sollicito tribuo.",
//           "updatedAt": "2025-06-18T08:19:16.694Z",
//           "id": "8f1e0f5d-5d8a-4cf6-829b-2b6b6af98104",
//           "userId": "d91b10cf-e945-43c8-a1a9-b401ddd52986"
//         },
//         {
//           "imageUrl": "https://picsum.photos/seed/qmxw6hmHf2/640/480",
//           "caption": "Arca usque nulla ulterius aperte acidus aer minus totidem.",
//           "updatedAt": "2024-05-31T07:16:02.332Z",
//           "id": "9af22348-d5f8-47fe-ae87-9cc3b2e1d6a3",
//           "userId": "d91b10cf-e945-43c8-a1a9-b401ddd52986"
//         },
//         {
//           "imageUrl": "https://loremflickr.com/640/480?lock=6429940285177856",
//           "caption": "Vicinus pauper consectetur deprecator tabgo concido.",
//           "updatedAt": "2025-05-29T15:55:33.424Z",
//           "id": "09da250d-3999-4ca7-8b4f-ca8a59604ab2",
//           "userId": "d91b10cf-e945-43c8-a1a9-b401ddd52986"
//         }
//       ]
//     },
//     {
//       "name": "Nora Howell",
//       "email": "Mireya52@hotmail.com",
//       "emailVerified": "2024-08-20T13:25:55.970Z",
//       "image": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/600.jpg",
//       "updatedAt": "2024-01-22T01:47:21.054Z",
//       "id": "38c5b651-4004-4b92-87ca-07368eabc184",
//       "profile": {
//         "bio": "Attollo delectus denique varietas dolor aspernatur conduco quis appono. Itaque ex capillus talis apto cetera toties tego. Tricesimus conitor absque circumvenio consequuntur supellex cupio allatus sursum.",
//         "avatarUrl": "https://avatars.githubusercontent.com/u/79750646",
//         "location": "Kemmerland",
//         "updatedAt": "2025-01-20T13:13:26.412Z",
//         "id": "5af82ac5-b377-419a-a928-c3250eee585f",
//         "userId": "38c5b651-4004-4b92-87ca-07368eabc184"
//       },
//       "posts": [
//         {
//           "imageUrl": "https://loremflickr.com/640/480?lock=5095362742190080",
//           "caption": "Dolores viriliter cibus textilis rem tergum ocer quam.",
//           "updatedAt": "2023-12-29T23:41:07.135Z",
//           "id": "0c2e3a0a-547e-4eeb-a5e4-65669c3b228c",
//           "userId": "38c5b651-4004-4b92-87ca-07368eabc184"
//         },
//         {
//           "imageUrl": "https://loremflickr.com/640/480?lock=973920035405824",
//           "caption": "Quos vulariter adsum non triumphus ultra suasoria bestia.",
//           "updatedAt": "2024-06-11T00:43:59.128Z",
//           "id": "de6b5f8a-246f-46fd-b58d-8af972871bbe",
//           "userId": "38c5b651-4004-4b92-87ca-07368eabc184"
//         },
//         {
//           "imageUrl": "https://loremflickr.com/640/480?lock=1674611506806784",
//           "caption": "Quam auctus beatae ea.",
//           "updatedAt": "2025-11-02T23:40:13.260Z",
//           "id": "d0db0d17-11b6-4e87-b5f0-14a2516b8da8",
//           "userId": "38c5b651-4004-4b92-87ca-07368eabc184"
//         }
//       ]
//     },
//     {
//       "name": "Dr. Dallas Lebsack",
//       "email": "Mylene56@gmail.com",
//       "emailVerified": "2024-06-26T18:39:04.306Z",
//       "image": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/827.jpg",
//       "updatedAt": "2024-07-20T08:54:45.387Z",
//       "id": "c229e055-081f-4bc8-881a-547573d88161",
//       "profile": {
//         "bio": "Patria arbustum deprimo desidero. Vapulus beatae clam utilis asper modi crudelis videlicet adamo. Contabesco decor curatio comptus vero avarus cribro auxilium deputo solium.",
//         "avatarUrl": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1183.jpg",
//         "location": "Danteton",
//         "updatedAt": "2024-04-28T22:36:09.665Z",
//         "id": "97a8b5b0-01cb-4ea9-b90d-d3e80c9764fe",
//         "userId": "c229e055-081f-4bc8-881a-547573d88161"
//       },
//       "posts": [
//         {
//           "imageUrl": "https://picsum.photos/seed/D6VnRvgB/640/480",
//           "caption": "Vorago necessitatibus odit accommodo ars absconditus.",
//           "updatedAt": "2025-10-18T08:50:29.104Z",
//           "id": "5c356c5b-0bb6-4d3e-a4a5-e9712a409463",
//           "userId": "c229e055-081f-4bc8-881a-547573d88161"
//         },
//         {
//           "imageUrl": "https://loremflickr.com/640/480?lock=747023439495168",
//           "caption": "Somniculosus totam repudiandae auxilium ab cohaero vindico summa paulatim.",
//           "updatedAt": "2024-06-03T16:10:06.743Z",
//           "id": "532b47f4-32ee-4317-9abf-9c02c95b9146",
//           "userId": "c229e055-081f-4bc8-881a-547573d88161"
//         },
//         {
//           "imageUrl": "https://picsum.photos/seed/Gv82rUGJZ/640/480",
//           "caption": "Crastinus coerceo varius curvo.",
//           "updatedAt": "2025-06-14T05:53:17.291Z",
//           "id": "96292efc-2343-47b2-bada-4fc03a4673e7",
//           "userId": "c229e055-081f-4bc8-881a-547573d88161"
//         }
//       ]
//     },
//     {
//       "name": "Pearl Kunde",
//       "email": "Lamont_Donnelly@hotmail.com",
//       "emailVerified": "2025-07-25T10:14:49.480Z",
//       "image": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/667.jpg",
//       "updatedAt": "2024-06-13T07:42:43.596Z",
//       "id": "986af280-5899-481f-a0ae-6947b1bb3693",
//       "profile": {
//         "bio": "Utroque cuppedia conatus tametsi deripio aequitas cetera curto demonstro. Molestias convoco ultio unde at termes supra argentum. Magnam deripio utor depereo tergo curto ventito currus tamquam.",
//         "avatarUrl": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/499.jpg",
//         "location": "Port Elinoreland",
//         "updatedAt": "2025-03-31T11:22:45.473Z",
//         "id": "3655ce49-90d2-458d-a841-c66717c8726f",
//         "userId": "986af280-5899-481f-a0ae-6947b1bb3693"
//       },
//       "posts": [
//         {
//           "imageUrl": "https://picsum.photos/seed/6H5Mvkj/640/480",
//           "caption": "Clam utpote adficio minus adulescens.",
//           "updatedAt": "2025-08-10T09:52:23.982Z",
//           "id": "978b66ad-8de0-4370-90b6-c85e1479a2a0",
//           "userId": "986af280-5899-481f-a0ae-6947b1bb3693"
//         },
//         {
//           "imageUrl": "https://picsum.photos/seed/fks6f/640/480",
//           "caption": "Derideo amplitudo carbo enim recusandae.",
//           "updatedAt": "2025-06-01T13:41:46.515Z",
//           "id": "02fbf137-2b69-4adb-b7cd-73998ef8318d",
//           "userId": "986af280-5899-481f-a0ae-6947b1bb3693"
//         },
//         {
//           "imageUrl": "https://loremflickr.com/640/480?lock=2351412992278528",
//           "caption": "Explicabo acsi clementia magni ultio super.",
//           "updatedAt": "2025-04-13T13:15:18.694Z",
//           "id": "37a85dd6-8935-4c4d-bb33-db098af6e2bf",
//           "userId": "986af280-5899-481f-a0ae-6947b1bb3693"
//         }
//       ]
//     },
//     {
//       "name": "Stephen Wintheiser",
//       "email": "Alvah19@hotmail.com",
//       "emailVerified": "2024-09-07T17:34:35.436Z",
//       "image": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/469.jpg",
//       "updatedAt": "2025-01-27T15:53:29.027Z",
//       "id": "cabddf7d-dd6d-465d-8925-e55d87bc7681",
//       "profile": {
//         "bio": "Velociter demergo admoveo crux abundans. Auctus amplus thorax cras tardus ara adfectus spargo acquiro. Peior solio soluta adinventitias vobis statim vulpes trado vesco socius.",
//         "avatarUrl": "https://avatars.githubusercontent.com/u/93878677",
//         "location": "Runolfssonburgh",
//         "updatedAt": "2025-03-01T11:03:41.187Z",
//         "id": "4f75e6a5-17fc-4481-a353-6c23afe005a0",
//         "userId": "cabddf7d-dd6d-465d-8925-e55d87bc7681"
//       },
//       "posts": [
//         {
//           "imageUrl": "https://picsum.photos/seed/sv8ze/640/480",
//           "caption": "Audeo deorsum spoliatio delego tego.",
//           "updatedAt": "2025-09-23T14:21:28.170Z",
//           "id": "9fc8662a-1994-40d6-be46-53390f8b3ae8",
//           "userId": "cabddf7d-dd6d-465d-8925-e55d87bc7681"
//         },
//         {
//           "imageUrl": "https://picsum.photos/seed/1vD6DRH/640/480",
//           "caption": "Similique caelum commemoro aer utilis pauper.",
//           "updatedAt": "2024-08-31T04:31:18.081Z",
//           "id": "fc604c6d-ca3a-4a5c-a2f7-29820a011160",
//           "userId": "cabddf7d-dd6d-465d-8925-e55d87bc7681"
//         },
//         {
//           "imageUrl": "https://loremflickr.com/640/480?lock=8789936952049664",
//           "caption": "Comprehendo stillicidium cunctatio calco caput quae amita velociter.",
//           "updatedAt": "2024-08-31T19:49:34.015Z",
//           "id": "c73189d0-492c-40c3-86c6-d717aefb5329",
//           "userId": "cabddf7d-dd6d-465d-8925-e55d87bc7681"
//         }
//       ]
//     },
//     {
//       "name": "Bryant Kozey",
//       "email": "Gabrielle_Oberbrunner-Pacocha@hotmail.com",
//       "emailVerified": "2025-08-20T07:25:53.654Z",
//       "image": "https://avatars.githubusercontent.com/u/16581109",
//       "updatedAt": "2025-08-24T04:20:23.184Z",
//       "id": "6c498e22-cc18-42d7-859f-2c1b3150dba9",
//       "profile": {
//         "bio": "Casus versus ventito cognomen tum succurro hic tempus spectaculum tumultus. Tutamen versus vinculum. Ea tristis calco sed adinventitias succedo.",
//         "avatarUrl": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/607.jpg",
//         "location": "Schulistbury",
//         "updatedAt": "2025-06-23T03:36:24.527Z",
//         "id": "5221fdd6-6beb-402c-8b06-c09a9bd97cdc",
//         "userId": "6c498e22-cc18-42d7-859f-2c1b3150dba9"
//       },
//       "posts": [
//         {
//           "imageUrl": "https://picsum.photos/seed/MC37h/640/480",
//           "caption": "Canonicus triduana trucido sonitus vesco cuppedia dedecor aliquid ventus arca.",
//           "updatedAt": "2025-11-13T23:53:58.867Z",
//           "id": "f40a5666-9bb3-4d36-a816-5fddd304c363",
//           "userId": "6c498e22-cc18-42d7-859f-2c1b3150dba9"
//         },
//         {
//           "imageUrl": "https://picsum.photos/seed/9tvvd/640/480",
//           "caption": "Cupressus optio tergo canonicus suscipit.",
//           "updatedAt": "2025-02-13T23:52:53.039Z",
//           "id": "0166bb56-fcf7-4415-b9fc-4a491bb12e47",
//           "userId": "6c498e22-cc18-42d7-859f-2c1b3150dba9"
//         },
//         {
//           "imageUrl": "https://picsum.photos/seed/96awwkK/640/480",
//           "caption": "Molestiae debeo sodalitas error curriculum praesentium antiquus utilis contego molestias.",
//           "updatedAt": "2024-08-12T13:53:51.815Z",
//           "id": "b89e99e4-4ce4-44bf-a11d-1ba6395c842b",
//           "userId": "6c498e22-cc18-42d7-859f-2c1b3150dba9"
//         }
//       ]
//     },
//     {
//       "name": "Jake Doyle",
//       "email": "Melody18@yahoo.com",
//       "emailVerified": "2025-10-11T19:13:24.446Z",
//       "image": "https://avatars.githubusercontent.com/u/39889988",
//       "updatedAt": "2025-02-22T18:57:20.310Z",
//       "id": "ddea0d19-522a-4a11-a93d-97274613a804",
//       "profile": {
//         "bio": "Collum sulum veritas. Quae amicitia deprimo universe adiuvo aegrotatio ambulo debeo defluo aggero. Decumbo attollo collum sulum dedecor.",
//         "avatarUrl": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/588.jpg",
//         "location": "Council Bluffs",
//         "updatedAt": "2025-07-30T19:17:34.792Z",
//         "id": "f9062ea6-01ed-4620-b7d9-a6ddec683a14",
//         "userId": "ddea0d19-522a-4a11-a93d-97274613a804"
//       },
//       "posts": [
//         {
//           "imageUrl": "https://picsum.photos/seed/wFy8R9O/640/480",
//           "caption": "Suffoco totus tersus peccatus amita.",
//           "updatedAt": "2025-04-18T02:52:04.069Z",
//           "id": "7238f852-7259-484b-b6e9-10c8c522a431",
//           "userId": "ddea0d19-522a-4a11-a93d-97274613a804"
//         },
//         {
//           "imageUrl": "https://loremflickr.com/640/480?lock=8596474338213888",
//           "caption": "Cohibeo sulum sursum vesica tergeo cado subvenio tendo thorax.",
//           "updatedAt": "2025-09-08T06:30:25.924Z",
//           "id": "62e5c7a2-975f-460f-b9a3-d13083c87fd2",
//           "userId": "ddea0d19-522a-4a11-a93d-97274613a804"
//         },
//         {
//           "imageUrl": "https://picsum.photos/seed/zSHovdJ/640/480",
//           "caption": "Sunt acsi sophismata eius crinis cruentus.",
//           "updatedAt": "2024-07-03T16:22:19.174Z",
//           "id": "d030af50-f33c-479c-9c3e-7c9c572b34b0",
//           "userId": "ddea0d19-522a-4a11-a93d-97274613a804"
//         }
//       ]
//     }
//   ]

// Please do make sure to retain these in your memory.

// Next up I created a feed with this route: src/app/(private)/feed
// which is supposed to provide a social media feed with dummy data to logged in users. This is what it looks like:

// // /src/app/(private)/feed/page.tsx

// import React from "react";
// import { GetServerSideProps } from "next";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import Card from "@mui/material/Card";
// import CardMedia from "@mui/material/CardMedia";
// import CardContent from "@mui/material/CardContent";
// import Box from "@mui/material/Box";


// interface Post {
//   imageUrl: string;
//   caption: string;
//   id: string;
// }

// interface User {
//   name: string;
//   posts: Post[];
// }

// interface Props {
//   userData: User[];
//   error: string | null;
// }
// const Posts = ({ userData, error }: Props) => {
//   if (error) {
//     return (
//       <Container>
//         <Typography variant="h4" gutterBottom>
//           {error}
//         </Typography>
//       </Container>
//     );
//   }

//   return(
//     <Container>
//       <Typography variant="h4" gutterBottom>
//         Zadus se tim feedem
//       </Typography>

//       {/* Loop through the users and their posts */}
//       <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={2}>
//         {userData.map((user) =>
//           user.posts.map((post) => (
//             <Box key={post.id}>
//               <Card>
//                 <CardMedia
//                   component="img"
//                   height="140"
//                   image={post.imageUrl}
//                   alt={post.caption}
//                 />
//                 <CardContent>
//                   <Typography variant="body2" color="text.secondary">
//                     {post.caption}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Box>
//           ))
//         )}
//       </Box>
//     </Container>
//  );
// };

// export const getServerSideProps: GetServerSideProps = async () => {
//   try {
//     const response = await fetch("http://localhost:3000/api/posts"); // Update to the correct API endpoint
//     if (!response.ok) {
//       throw new Error("Failed to fetch posts");
//     }
//     const data = await response.json();
//     return {
//       props: {
//         userData: data, // Pass the fetched data to the page
//         error: null,
//       },
//     };
//   } catch (error) {
//     return {
//       props: {
//         userData: [],
//         error: "Failed to load posts.",
//       },
//     };
//   }
// };

// export default Posts;
// Please remember this aswell!

// Next up I decided with your help to render the data on the server side so I created the actions folder - src/app/actions that contains the post_action.ts that is, to my understanding, supposed to fetch the data straight from prisma
// and make it available to put on my feed/page.tsx page for the users to view. This is what Id like to achieve.

// This is what post_action.ts looks like:
// // src/app/actions/post_action.ts
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// // Fetch posts from the database
// export async function getPosts() {
//   try {
//     // Query the database to fetch users and their posts
//     const posts = await prisma.user.findMany({
//       include: {
//         posts: true, // Include posts for each user
//       },
//     });

//     // Map the data to a desired format (if needed)
//     const userData = posts.map((user) => ({
//       name: user.name,
//       posts: user.posts.map((post) => ({
//         id: post.id,
//         imageUrl: post.imageUrl,
//         caption: post.caption,
//       })),
//     }));

//     return userData;
//   } catch (error) {
//     console.error("Error fetching posts:", error);
//     throw new Error("Error fetching posts");
//   } finally {
//     await prisma.$disconnect(); // Ensure the Prisma client is disconnected
//   }
// }
