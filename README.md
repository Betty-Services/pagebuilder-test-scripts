# exam-learning-automation

To test an exam:

Input variables:
app_identifier = app_id of the betty application to be tested.
username = WebUser username login credentials
password = WebUser password
filename = Some name you want to give the results file.
exam_type = the type of the exam that was conducted. At the time of writing this is: socialmedia, reservation, music or news

1. Trigger a workflow (this can also be done manually from github actions). The workflow will write a filename in the ./docs/<filename> directory

   POST: https://api.github.com/repos/FedorBB/exam-learning-automation/actions/workflows/test-exam.yml/dispatches
   Headers:
   Authorization: OAuth2 github token

   Body:
   {
   "inputs": {
   "app_identifier": "<app_id>",
   "username": "<username>",
   "password": "<password>",
   "filename": "<filename>"
   "exam_type: ""<exam_type>" //e.g. socialmedia
   },
   "ref" : "<branch>"
   }

2. Poll to get results. Result is located in ./docs directory and can be requested by the filename.

   GET: https://api.github.com/repos/FedorBB/exam-learning-automation/contents/docs/<filename>.json

Headers:
Authorization: OAuth2 github token

Response example:

{
"name": "<filename>",
"path": "docs/<filename>.json",
"sha": "663edb2832c20eeeaeca3e75dbd97722aa5f2b54",
"size": 14493,
"url": "https://api.github.com/repos/FedorBB/exam-learning-automation/contents/docs/<filename>.json?ref=main",
"html_url": "https://github.com/FedorBB/exam-learning-automation/blob/main/docs/<filename>.json",
"git_url": "https://api.github.com/repos/FedorBB/exam-learning-automation/git/blobs/663edb2832c20eeeaeca3e75dbd97722aa5f2b54",
"download_url": "https://raw.githubusercontent.com/FedorBB/exam-learning-automation/main/docs/<filename>.json?token=AWUDLRI7KSPWDH4U6COMX7DBU56JW",
"type": "file",
"content": "<requested_file_data>",
"encoding": "base64",
"\_links": {
"self": "https://api.github.com/repos/FedorBB/exam-learning-automation/contents/docs/<filename>.json?ref=main",
"git": "https://api.github.com/repos/FedorBB/exam-learning-automation/git/blobs/663edb2832c20eeeaeca3e75dbd97722aa5f2b54",
"html": "https://github.com/FedorBB/exam-learning-automation/blob/main/docs/<filename>.json"
}
}

3a. You can decode the base64 content to get the required json.file which to get the json result.

3b. You can GET the json as txt response from the download_url result

GET "download_url": "https://raw.githubusercontent.com/FedorBB/exam-learning-automation/main/docs/<filename>.json?token=AWUDLRI7KSPWDH4U6COMX7DBU56JW",
