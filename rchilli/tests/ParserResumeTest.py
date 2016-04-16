import unittest

from ParseResumeApis.XmlConverter import XmlConverter
from ParseResumeApis.RChilliParseResumeApi import RChilliParseResumeApi
from ParseResumeApis.HireAbilityParseResumeApi import HireAbilityParseResumeApi


class ParserResumeTest(unittest.TestCase):

    def setUp(self):
        self.resumeFilePath = 'data/6faa8321-0c3b-4928-92a6-c86ade3a56aa.docx'


    def TestRChilli(self):
        api = RChilliParseResumeApi()

        xmlResponse = api.Parse(self.resumeFilePath)
        self.assertEqual(True, xmlResponse != None )
        print xmlResponse

        dict = XmlConverter.xml2dict(xmlResponse)
        print dict

        json = XmlConverter.xml2json(xmlResponse)
        print json

    def TestHireAbility(self):

        api = HireAbilityParseResumeApi()

        xmlResponse = api.Parse(self.resumeFilePath)
        self.assertEqual(True, xmlResponse != None )
        print xmlResponse

        dict = XmlConverter.xml2dict(xmlResponse)
        print dict

        json = XmlConverter.xml2json(xmlResponse)
        print json



if __name__ == '__main__':
    unittest.main()
