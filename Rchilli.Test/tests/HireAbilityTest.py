import optparse
import unittest
import base64
from suds.client import Client
from xml2json import xml2json
import xmltodict
import json

class HireAbilityTest(unittest.TestCase):
    
    def setUp(self):

        self.resumeFilePath = 'data/6faa8321-0c3b-4928-92a6-c86ade3a56aa.docx'
        self.HireAbilityApiUrl = 'http://processing.resumeparser.com/ParsingTools.soap?wsdl'
        self.HireAbilityProductKey = '25b7da76be72bcf460ae432aa3107042'

    def TestResume(self):

        with open(self.resumeFilePath, "rb") as resume_file:  resume_encoded_string = base64.b64encode(resume_file.read()) # read file

        client = Client(self.HireAbilityApiUrl) # init soap client
        print client

        xmlResult = client.service.ParseDocNew(self.HireAbilityProductKey, self.resumeFilePath,resume_encoded_string , "", "", "", "") # get response
        dictResult = xmltodict.parse(xmlResult) # dictionary
        jsonResult = json.dumps(dictResult) # json
        print jsonResult

        xmlResult = xmlResult.encode('ascii', 'ignore').decode('ascii')
        print xmlResult

        options = optparse.Values({"pretty": False})
        strip_ns = 1
        jsonoutput = xml2json(xmlResult, options, strip_ns)
        print jsonoutput

        self.assertEqual(True, xmlResult != None )


if __name__ == '__main__':
    unittest.main()
