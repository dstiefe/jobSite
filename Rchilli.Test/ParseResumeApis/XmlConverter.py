import xmltodict
import json

class XmlConverter(object):
    """
    Xml Converter
    """

    @staticmethod
    def xml2dict(xml):
        """
        Convert XML to dict
        :param xml: XMl-string
        :return: Dict
        """
        dictResult = xmltodict.parse(xml) # dictionary
        return dictResult

    @staticmethod
    def xml2json(xml):
        """
        Convert XML to JSON
        :param xml: XMl-string
        :return: JSON-string
        """
        dictResult = XmlConverter.xml2dict(xml) # dictionary
        jsonResult = json.dumps(dictResult) # json
        return jsonResult