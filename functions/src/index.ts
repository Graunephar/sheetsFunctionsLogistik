import * as functions from "firebase-functions";

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.region('europe-west1').https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", {structuredData: true});
    response.send("Hello from Firebase!");
});

export const mondayWebhook = functions.region('europe-west1').https.onRequest((request, response) => {
    functions.logger.info("Start!", {structuredData: true});
    if(typeof request.body === null) {
        functions.logger.info("No data", {structuredData: true});
        response.send("No Data send!");
    }

    if(request.body.challenge !== undefined) { //This is the first request that monday sends, it will expect the service to reply with the same data as it sends.
        functions.logger.info("Data, and challenge found, this is an initiation request from monday!", {structuredData: true});
        response.contentType("application/json");
        response.send(request.body)
    } else { // this is a 'normal' update event from monday
        if(typeof request.body.event.value !== null) {
            const value = request.body.event.value.value
            functions.logger.debug("Værdi?")
            functions.logger.debug(value)
            response.send(request.body.event.value.value);
        } else {
            functions.logger.info("There was data, but no challenge!", {structuredData: true});
            response.send("There was data, but no challenge!")
        }


    }

});
