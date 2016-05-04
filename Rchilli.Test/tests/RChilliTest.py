import unittest
import base64
from suds.client import Client
from xml2json import xml2json

import optparse

class RChilliTest(unittest.TestCase):

    def setUp(self):

        self.resumeFilePath = 'data/6faa8321-0c3b-4928-92a6-c86ade3a56aa.docx'

        self.RChilliApiUrl = 'http://java.rchilli.com/RChilliParser/services/RChilliParser?wsdl'
        self.RChilliUserKey = 'Z304PG0A871'
        self.RChilliSubuserID = 'daytal'
        self.RChilliVersion = '6.0.0'

    def TestResume(self):

        with open(self.resumeFilePath, "rb") as resume_file:  resume_encoded_string = base64.b64encode(resume_file.read()) #read file

        client = Client(self.RChilliApiUrl) # init soap client
        print client

        result = client.service.parseResumeBinary(resume_encoded_string, self.resumeFilePath, self.RChilliUserKey, self.RChilliVersion, self.RChilliSubuserID)
        #print result

        result = result.encode('ascii', 'ignore').decode('ascii')
        #print result

        options = optparse.Values({"pretty": False})
        strip_ns = 1
        json = xml2json(result, options, strip_ns)
        print json

        self.assertEqual(True, result != None )


if __name__ == '__main__':
    unittest.main()
