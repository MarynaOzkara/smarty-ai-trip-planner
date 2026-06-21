import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
const chat = ai.chats.create({
  model: "gemini-2.5-flash",
  history: [
    {
      role: "user",
      parts: [
        {
          text: `Generate a Travel Plan from origin: Tallinn to destination: Sintra, with startDate 03/07/2026 and endDate 05/07/2026 for 2 days for family for a budget budget with a flight details, airlines, flight price with a booking url, hotels options with list of 3-5 hotels with hotel name, hotel address, price only per 1 night, rating, descriptions, booking url, and places to visit nearby with place name, address, details, price ,ticket pricing, booking url, time to travel each of the locations for 1 day plan with best time to visit. Please include also in the itinerary real restaurants or caffe where people can have a breakfast, launch and dinner with only real place name, address and price. Plan please itinerary activities time from 09:00 - 18:00. Don’t include in itineraty flight and hotel, start straightaway from activities. And calculate approximately price for trip for one person including flight price, hotel price for all days and activities price. Geve descriptions for tripNote, hotel description, activity and activities details, howToGetTo and transfer details(max 1 sentence) in Ukrainian language, other data in english. hotelName and placeName only data name in english without any description.
1.Search flights at kiwi.com and add bookin url https://www.kiwi.com/deep?affilid=ozkarablogaitripplanner&currency=EUR&from=anywhere&to=anywhere&departure=anytime&lang=uk&return=anytime. Only change from=origin and to=destination and dates depature and return for trip, for example for trip from Tallinn to Prague from 16 August to 18 August https://www.kiwi.com/deep?affilid=ozkarablogaitripplanner&currency=EUR&departure=2026-08-16_2026-08-16&from=TLL&to=PRG&lang=uk&return=2026-08-18_2026-08-18.
2. Search hotels at booking.com and add booking url https://www.booking.com/.
3.Search tickets for activities at https://www.tiqets.com/?partner=smarty_travels-187662. If you can find country of destination in the list, use only exclusive suitable country link for booking url, do not add any additional attributes(sity, name of activity): https://www.tiqets.com/spain-attractions-z50067/?partner=smarty_travels-187662
https://www.tiqets.com/portugal-attractions-z50184/?partner=smarty_travels-187662
https://www.tiqets.com/things-to-do-in-france-z50074/?partner=smarty_travels-187662
https://www.tiqets.com/belgium-attractions-z50019/?partner=smarty_travels-187662
https://www.tiqets.com/ireland-attractions-z50101/?partner=smarty_travels-187662
https://www.tiqets.com/germany-attractions-z50056/?partner=smarty_travels-187662
https://www.tiqets.com/austria-attractions-z50011/?partner=smarty_travels-187662
https://www.tiqets.com/italy-attractions-z50109/?partner=smarty_travels-187662
https://www.tiqets.com/greece-attractions-z50088/?partner=smarty_travels-187662
https://www.tiqets.com/hungary-attractions-z50099/?partner=smarty_travels-187662
https://www.tiqets.com/poland-attractions-z50179/?partner=smarty_travels-187662
https://www.tiqets.com/norway-attractions-z50167/?partner=smarty_travels-187662
https://www.tiqets.com/sweden-attractions-z50198/?partner=smarty_travels-187662
https://www.tiqets.com/finland-attractions-z50069/?partner=smarty_travels-187662
https://www.tiqets.com/turkey-attractions-z50225/?partner=smarty_travels-187662
https://www.tiqets.com/iceland-attractions-z50108/?partner=smarty_travels-187662
https://www.tiqets.com/czech-republic-attractions-z50055/?partner=smarty_travels-187662
https://www.tiqets.com/slovakia-attractions-z50203/?partner=smarty_travels-187662
https://www.tiqets.com/croatia-attractions-z50097/?partner=smarty_travels-187662
https://www.tiqets.com/united-kingdom-attractions-z50076/?partner=smarty_travels-187662
https://www.tiqets.com/romania-attractions-z50189/?partner=smarty_travels-187662
https://www.tiqets.com/estonia-attractions-z50063/?partner=smarty_travels-187662
https://www.tiqets.com/latvia-attractions-z50135/?partner=smarty_travels-187662
https://www.tiqets.com/lithuania-attractions-z50133/?partner=smarty_travels-187662.If you can not find destination country, use for booking url just https://www.tiqets.com/?partner=smarty_travels-187662.
4.If you can't find booking url leave emty string, do not write N/A or any other text, only empty string. For example, if you can't find booking url for restaurant, it should be "bookingUrl": "".
5.Only, if origin city located in Ukraine, please search flights from Poland, Romania, Slovakia, Hungary, Moldova. For example, if origin is Kyiv, search flights from Warsaw, Budapest, Bratislava, Bucharest, Chisinau. Add in trip buss from origin city to nearest city with flights and add in strict schema transferFromOrigin: booking url, company name and price for bus tickets search at https://infobus.eu/ua/bus?partner=3695&marker_id=252590&currency=EUR. Only add from and to and dates, for example for trip from Kyiv to Warsaw https://infobus.eu/ua/Kyiv/Warsaw/09.06/7/?partner=3695&marker_id=252590&currency=EUR.
6.If origin city located in Ukraine and destination city located in Ukraine don't add flight, only add transferToDestination with strict schema transferToDestination with booking url, company name and price for bus tickets search at https://infobus.eu/ua/bus?partner=3695&marker_id=252590&currency=EUR. Only add from and to and dates, for example for trip from Kyiv to Lviv https://infobus.eu/ua/Kyiv/Lviv/09.06/7/?partner=3695&marker_id=252590&currency=EUR. 
7.If origin or destination city located in Russia, Belarus don't make any Travel Plan and return JSON response with tripNote: "Sorry, we cannot generate a travel plan for this destination due to current geopolitical situation."
8.If destination city in Europe has no flights, please search for nearby cities with flights and add to trip transfer from airport to destination city with strict schema transferToDestination with booking url, company name and price for bus tickets search at https://www.omio.com/. For example, if destination is Sintra, Portugal, search for flights to Lisbon and transfer from Lisbon to Sintra.
9.If travelers with pets, please search for pet friendly options and add pet-friendly hotels, airlines and activities.
10.All prices geve integer.
11.Generate and return a strict JSON response only`,
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: JSON.stringify({
            tripNote:
              "Цей план подорожі призначений для сім'ї з Таллінна до Сінтрі, Португалія, на бюджетний 2-денний відпочинок. Він охоплює основні пам'ятки, бюджетне житло та варіанти харчування, з акцентом на ефективне використання часу та витрат. Маршрут включає переліт до Лісабона та подальший трансфер до Сінтрі.",
            transferFromOrigin: {
              bookingUrl: "https://infobus.eu/",
              company: "Ecolines/Eurolines",
              details:
                "Поїздка на комфортабельному автобусі міжнародного рейсу з Києва до Варшави та назад.",

              price: 70,
            },
            flights: {
              origin: "Tallinn (TLL)",
              destination: "Lisbon (LIS)",
              startDate: "2026-07-03",
              endDate: "2026-07-05",
              airline: "Ryanair/TAP Air Portugal (with layover)",
              price: 380,
              bookingUrl:
                "https://www.kiwi.com/deep?affilid=ozkarablogaitripplanner&currency=EUR&departure=2026-07-03_2026-07-03&destination=lisbon_pt&lang=en&return=2026-07-05_2026-07-05&returnFromDifferentAirport=false&returnToDifferentAirport=false",
            },
            transferToDestination: {
              company: "CP - Comboios de Portugal",
              price: 5.0,
              bookingUrl: "https://www.omio.com",
              details:
                "З аеропорту Лісабона дістаньтеся метро до станції Oriente (червона лінія), а звідти поїздом до Сінтрі.",
            },
            hotels: [
              {
                hotelName: "Sintra Green Chalet Bed & Breakfast",
                address: "Estrada Da Pena 39, 2710-543 Sintra, Portugal",
                price: 85,
                rating: 9.1,
                description:
                  "Затишний пансіонат типу «ліжко та сніданок» з чарівним садом, розташований недалеко від основних пам'яток. Пропонує комфортні номери в тихому районі, ідеально підходить для сімейного відпочинку.",
                bookingUrl: "https://www.booking.com",
                petFriendly: false,
              },
              {
                hotelName: "Casa Azul Hostel",
                address:
                  "Rua Dr. Alfredo da Costa, Nº14, 2710-539 Sintra, Portugal",
                price: 60,
                rating: 8.7,
                description:
                  "Цей хостел розташований у центрі Сінтрі, пропонує приватні та спільні номери. Чудовий вибір для бюджетних мандрівників та сімей, які шукають зручне розташування та привітну атмосферу.",
                bookingUrl: "https://www.booking.com",
                petFriendly: false,
              },
              {
                hotelName: "Hotel Nova Sintra",
                address:
                  "Estrada Nacional 247 Km 54, Sintra, 2705-000 Sintra, Portugal",
                price: 75,
                rating: 7.8,
                description:
                  "Простий, але комфортний готель, розташований трохи далі від центру, але з хорошим доступом до транспорту. Ідеально підходить для сімей, яким потрібне тихе місце для відпочинку за розумну ціну.",
                bookingUrl: "https://www.booking.com",
                petFriendly: false,
              },
            ],
            itinerary: [
              {
                day: 1,
                date: "2026-07-04",
                activities: [
                  {
                    time: "09:00 - 10:00",
                    activity: "Сніданок у Café Saudade",
                    placeName: "Café Saudade",
                    address: "Praça da República 46, 2710-616 Sintra, Portugal",
                    details:
                      "Розпочніть день із ситного сніданку в затишному кафе, розташованому біля залізничного вокзалу Сінтрі. Пропонує смачні випічки, каву та легкі страви.",
                    ticketPricing: 8,
                    bookingUrl: "",
                    howToGetTo:
                      "Пішки від залізничного вокзалу Сінтрі або центру міста.",
                  },
                  {
                    time: "10:30 - 13:00",
                    activity: "Відвідини палацу Пена",
                    placeName: "Pena Palace",
                    address: "Estrada da Pena, 2710-609 Sintra, Portugal",
                    details:
                      "Ексцентричний і барвистий палац Пена є одним з найвідоміших символів Португалії. Прогуляйтеся по його яскравим кімнатам і насолоджуйтесь панорамними видами з терас.",
                    ticketPricing: 14,
                    bookingUrl:
                      "https://tp.media/r?marker=58449&trs=331062&p=2074&u=https%3A%2F%2Fwww.tiqets.com%2Fen%2Fsintra-attractions-c102000%2Fpena-palace-park-ticket-p974955&campaign_id=89",
                    howToGetTo:
                      "Автобус 434 від залізничного вокзалу Сінтрі або таксі/Uber. Подорож займає близько 20 хвилин.",
                  },
                  {
                    time: "13:30 - 14:30",
                    activity: "Обід у Tascantiga",
                    placeName: "Tascantiga",
                    address:
                      "R. Guilherme Gomes Fernandes 1, 2710-567 Sintra, Portugal",
                    details:
                      "Традиційний португальський ресторан, який пропонує тапас та місцеві страви в затишній атмосфері. Чудове місце для сімейного обіду за розумною ціною.",
                    ticketPricing: 18,
                    bookingUrl: "",
                    howToGetTo:
                      "Пішки від центру Сінтрі, біля Національного палацу.",
                  },
                  {
                    time: "15:00 - 17:30",
                    activity: "Вивчення Quinta da Regaleira",
                    placeName: "Quinta da Regaleira",
                    address:
                      "R. Barbosa du Bocage 5, 2710-567 Sintra, Portugal",
                    details:
                      "Містична садиба з палацом, каплицею та розкішним парком, відомим своїми гротами, озерами, колодязем посвяти та таємними проходами. Чудово підходить для пригод з дітьми.",
                    ticketPricing: 12,
                    bookingUrl:
                      "https://tp.media/r?marker=58449&trs=331062&p=2074&u=https%3A%2F%2Fwww.tiqets.com%2Fen%2Fsintra-attractions-c102000%2Fquinta-da-regaleira-ticket-p974965&campaign_id=89",
                    howToGetTo:
                      "Коротка прогулянка пішки від центру міста або автобусом 435.",
                  },
                  {
                    time: "18:30 - 20:00",
                    activity: "Вечеря у Incomum By Luis Santos",
                    placeName: "Incomum By Luis Santos",
                    address: "R. da Ferraria 2, 2710-449 Sintra, Portugal",
                    details:
                      "Сучасний португальський ресторан з вишуканими стравами та приємною атмосферою. Пропонує гарне поєднання традиційних та інноваційних смаків, підходить для сімейної вечері.",
                    ticketPricing: 25,
                    bookingUrl: "",
                    howToGetTo:
                      "Розташований у центрі Сінтрі, легко дістатися пішки.",
                  },
                ],
              },
              {
                day: 2,
                date: "2026-07-05",
                activities: [
                  {
                    time: "09:00 - 10:00",
                    activity: "Сніданок у пекарні Queijadas da Sapa",
                    placeName: "Queijadas da Sapa",
                    address: "Volta do Duche 12, 2710-631 Sintra, Portugal",
                    details:
                      "Насолоджуйтесь типовим португальським сніданком з випічкою (як-от Pasteis de Nata) та кавою у місцевій пекарні.",
                    ticketPricing: 6,
                    bookingUrl: "",
                    howToGetTo: "Пішки від вашого готелю.",
                  },
                  {
                    time: "10:30 - 12:30",
                    activity:
                      "Дослідження історичного центру Сінтрі та Національного палацу Сінтрі",
                    placeName: "National Palace of Sintra",
                    address:
                      "Largo Rainha Dona Amélia, 2710-616 Sintra, Portugal",
                    details:
                      "Відвідайте Національний палац Сінтрі, єдиний збережений середньовічний королівський палац у Португалії, відомий своїми великими конічними димоходами та азулежу. Прогуляйтеся по історичному центру Сінтрі, щоб купити сувеніри.",
                    ticketPricing: 10,
                    bookingUrl:
                      "https://tp.media/r?marker=58449&trs=331062&p=2074&u=https%3A%2F%2Fwww.tiqets.com%2Fen%2Fsintra-attractions-c102000%2Fnational-palace-of-sintra-ticket-p974959&campaign_id=89",
                    howToGetTo:
                      "Розташований прямо в історичному центрі Сінтрі, легко дістатися пішки з будь-якої точки центру.",
                  },
                ],
              },
            ],
            estimatedTotalPrice: {
              flightPrice: 380,
              hotelPrice: 170,
              activitiesPrice: 36,
              foodPrice: 95,
              transferPrice: 10,
              total: 691,
            },
          }),
        },
      ],
    },
  ],
});

export async function generateTripWithAI(DYNAMIC_PROMPT) {
  try {
    const response = await chat.sendMessage({
      message: DYNAMIC_PROMPT,
    });
    const textResponse = response.text;
    const cleanJson = textResponse.replace(/```json|```/g, "").trim();
    // console.log("Trip data", cleanJson);
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error("Error generating trip with AI:", error);
    throw error;
  }
}
