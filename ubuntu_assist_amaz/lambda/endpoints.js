const baseUrl = ""; //Replace with backend endpoint
const checkApiStatusEndpoint = `${baseUrl}`
const getUserDocuments = `${baseUrl}/api/UserDocument/user`;
const getDocumentContent = `${baseUrl}/api/Document`
const askQuestionEndpoint = `${baseUrl}/api/DocumentQA/ask`

// Export the variable
module.exports = {
  checkApiStatusEndpoint:checkApiStatusEndpoint,
  getUserDocuments:getUserDocuments,
  getDocumentContent:getDocumentContent,
  askQuestionEndpoint:askQuestionEndpoint
};