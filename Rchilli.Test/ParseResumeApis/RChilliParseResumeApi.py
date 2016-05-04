from ParseResumeApis.ParseResumeApi import ParseResumeApi
import base64
from suds.client import Client

class RChilliParseResumeApi(ParseResumeApi):
    """
    RChilli Resume Parser
    """

    def __init__(self):
        """
        Constructor
        :return:
        """
        self.ApiUrl = 'http://java.rchilli.com/RChilliParser/services/RChilliParser?wsdl' #api url
        self.UserKey = 'Z304PG0A871' # user key
        self.SubuserID = 'daytal' # user ID
        self.Version = '6.0.0' # version

    def Parse(self, resumeFilePath):
        """
        Parse resume
        :param resumeFilePath: resume file path
        :return: XMl string
        """

        with open(resumeFilePath, "rb") as resume_file:  resume_encoded_string = base64.b64encode(resume_file.read()) # read file

        client = Client(self.ApiUrl)  # init soap client

        xmlresult = client.service.parseResumeBinary(resume_encoded_string, resumeFilePath, self.UserKey, self.Version, self.SubuserID)  # get response

        return xmlresult  # return result