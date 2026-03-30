const Alexa = require('ask-sdk-core');
const axios = require("axios");
const dynamoDbAdapter = require('ask-sdk-dynamodb-persistence-adapter');
const endpoints = require('./endpoints');

const userId = 'd9c7b7fe-d06a-45e5-b328-cfffaed633dd' //Hard coded for demo purposes :),
const serviceProviderId = '8bd28701-2a0e-40d8-8697-d6fa57056929'

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    async handle(handlerInput) {
        const attributesManager = handlerInput.attributesManager;
        const persistentAttributes = await attributesManager.getPersistentAttributes();
        
        let username = persistentAttributes.userName;

        let speakOutput = `Hi, Welcome to Ubuntu assist`;
        
        if(username){
            speakOutput = `Hi, Welcome to Ubuntu assist. How can I help?`;
        }
        else{
            
            persistentAttributes.userName = 'Sifiso';
            
            attributesManager.setPersistentAttributes(persistentAttributes);
            await attributesManager.savePersistentAttributes();
        }
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const GetDocumentsIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'GetDocumentsIntent';
    },
    async handle(handlerInput) {
        
        const attributesManager = handlerInput.attributesManager;
        const persistentAttributes = await attributesManager.getPersistentAttributes();
        
        persistentAttributes.getDocuments = []
        
        const {data, status} = await axios.get(`${endpoints.getUserDocuments}/${userId}`);
        
        let speakOutput = `I found  ${data.length > 1 ? (data.length + ' documents') : (data.length + ' document')}. <break time="1s"/>`;
        
        if(status === 200){
            if(data.length > 0){
                persistentAttributes.getDocuments = data
                attributesManager.setPersistentAttributes(persistentAttributes);
                await attributesManager.savePersistentAttributes();
                
                for (let index in data){
                    speakOutput += `Document ${(Number(index) + 1)} is titled ${data[index].fileName} <break time="1s"/>`
                }
            }
            else{
                speakOutput = `It seems like you don't have any documents available`
            }
        }

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('')
            .getResponse();
    }
};

const ReadDocumentIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ReadDocumentIntent';
    },
    async handle(handlerInput) {
        
        const attributesManager = handlerInput.attributesManager;
        const persistentAttributes = await attributesManager.getPersistentAttributes();
        
        let documents = persistentAttributes.getDocuments
        
        let firstDocument;
        let speakOutput = ''
        
        if(documents && documents.length > 0){
            firstDocument = documents[0]
  
            const {data, status} = await axios.get(`${endpoints.getDocumentContent}/${firstDocument.documentId}`);
        
            if(status === 200){
                persistentAttributes.currentDoc = firstDocument.documentId
                
                attributesManager.setPersistentAttributes(persistentAttributes);
                await attributesManager.savePersistentAttributes();
                           
                speakOutput = `Reading ${firstDocument.fileName} <break time="600ms"/>` 
                
                speakOutput += `${data.content}`
            }
            else
            {
                speakOutput = "failed to get document contents"
            }
            
        }
        else{
             speakOutput = `I don't seem to have documents saved in my memory, say get documents so I can get them`
        }
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const AskQuestionIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AskQuestionIntent';
    },
    async handle(handlerInput) {
        
        const attributesManager = handlerInput.attributesManager;
        const persistentAttributes = await attributesManager.getPersistentAttributes();
        
        let currentDocId = persistentAttributes.currentDoc
        
        let speakOutput = ``
        
        const question = Alexa.getSlotValue(handlerInput.requestEnvelope, "user_question");
        
        const {data, status} = await axios.post(`${endpoints.askQuestionEndpoint}`, {
                userId: userId,
                documentId: currentDocId,
                question: question
            });
        
            if(status === 200){
                speakOutput += `${data.answer}`
            }
            else{
                speakOutput = `Sorry, I could not get an answer for that.`
            }

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};


exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        AskQuestionIntentHandler,
        GetDocumentsIntentHandler,
        ReadDocumentIntentHandler,
        )
    .addErrorHandlers(
        ErrorHandler)
    .lambda();