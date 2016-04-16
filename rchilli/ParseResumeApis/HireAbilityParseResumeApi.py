from ParseResumeApis.ParseResumeApi import ParseResumeApi
import base64
from suds.client import Client

class HireAbilityParseResumeApi(ParseResumeApi):
    """
    Hire Ability Resume Parser
    """

    def __init__(self):
        """
        Constructor
        :return:
        """
        self.ApiUrl = 'http://processing.resumeparser.com/ParsingTools.soap?wsdl' # api url
        self.ProductKey = '25b7da76be72bcf460ae432aa3107042' # product key

    def Parse(self, resumeFilePath):
        """
        Parse resume
        :param resumeFilePath: resume file path
        :return: XMl string
        """

        with open(resumeFilePath, "rb") as resume_file:  resume_encoded_string = base64.b64encode(resume_file.read())  # read file

        client = Client(self.ApiUrl)  # init soap client

        xmlresult = client.service.ParseDocNew(self.ProductKey, resumeFilePath, resume_encoded_string, "", "", "", "")  # get response

        return xmlresult  # return result