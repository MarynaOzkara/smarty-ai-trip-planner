export const PROMPT = `Generate a Travel Plan from origin: Tallinn to destination: Sintra, with startDate 03/07/2026 and endDate 05/07/2026 for 2 days for family for a budget budget with a flight details, airlines, flight price with a booking url, hotels options with list of 3-5 hotels with hotel name, hotel address, price only per 1 night, rating, descriptions, booking url, and places to visit nearby with place name, address, details, price ,ticket pricing, booking url, time to travel each of the locations for 1 day plan with best time to visit. Please include also in the itinerary real restaurants or caffe where people can have a breakfast, launch and dinner with only real place name, address and price. Plan please itinerary activities time from 09:00 - 18:00 max places to visit 3 for 1 day. Don’t include in itineraty flight and hotel, start straightaway from activities. And calculate approximately price for trip for one person including flight price, hotel price for all days and activities price. Geve descriptions for tripNote, hotel description, activity and activities details, howToGetTo and transfer details(max 1 sentence) in Ukrainian language, other data in english. hotelName and placeName only data name in english without any description.
1.Search flights at kiwi.com and add Bookin url www.kiwi.com/deep?affilid=ozkarablogaitripplanner&currency=EUR&departure=anytime&lang=en&return=anytime&returnFromDifferentAirport=false&returnToDifferentAirport=false. Only change destination and dates for trip, for example for Prague from 16 March to 18 March www.kiwi.com/deep?affilid=ozkarablogaitripplanner&currency=EUR&departure=2026-03-16_2026-03-16&destination=prague_cz&lang=en&return=2026-03-18_2026-03-18&returnFromDifferentAirport=false&returnToDifferentAirport=false
2. Search hotels at booking.com.
1.Search tickets for activities at https://tiqets.com. When you make a booking url use always this link https://tp.media/r?marker=58449&trs=331062&p=2074&u=https%3A%2F%2Ftiqets.com&campaign_id=89 only change location for activities. For example, for Prague link https://www.tiqets.com/en/prague-attractions-c64162/ it will be https://tp.media/r?marker=58449&trs=331062&p=2074&u=https%3A%2F%2Fwww.tiqets.com%2Fen%2Fprague-attractions-c64162%2F&campaign_id=89
3.If origin city located in Ukraine, please search flights from Poland, Romania, Slovakia, Hungary, Moldova. For example, if origin is Kyiv, search flights from Warsaw, Budapest, Bratislava, Bucharest, Chisinau. Add in trip buss from origin city to nearest city with flights and add booking url, company name and price for bus tickets search at https://infobus.eu/.
4.If destination city in Europe has no flights, please search for nearby cities with flights and add to trip transfer from airport to destination city with booking url, company name and price for bus tickets search at https://www.omio.com/. For example, if destination is Sintra, Portugal, search for flights to Lisbon and transfer from Lisbon to Sintra.
5.If travelers with pets, please search for pet friendly options and add pet-friendly hotels, airlines and activities.
6.Generate and return a strict JSON response only with following JSON schema:
{
  "tripNote": "",
  "flights": {
    "origin": "",
    "destination": "",
    "startDate": "",
    "endDate": "",
    "airline": "",
    "price": 350,
    "bookingUrl": ""
  },
  "transfer": {
    "company": "",
    "price": ,
    "bookingUrl": "",
    "details": ""
  },
  "hotels": [
    {
      "hotelName": "",
      "address": "",
      "price": ,
      "rating": ,
      "description": "",
      "bookingUrl": "",
      "petFriendly": 
    },
  ],
  "itinerary": [
{ 
"day": 
      "date": "",
      "activities": [
        {
          "time": "",
         "activity": "",
          "placeName": "",
          "address": "",
          "details": "",
          "ticketPricing": ,
          "bookingUrl": "",
           "howToGetTo": "",
        },
      ]
},
],
  "estimatedTotalPrice": {
    "flightPrice": ,
    "hotelPrice": ,
    "activitiesPrice": ,
    "foodPrice": ,
    "transferPrice": ,
    "total": 
  }
}`;
