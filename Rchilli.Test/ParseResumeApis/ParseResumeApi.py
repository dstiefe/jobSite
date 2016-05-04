from abc import abstractmethod, ABCMeta

class ParseResumeApi:
    """
    Parse resume via external apis
    """
    __metaclass__ = ABCMeta

    @abstractmethod
    def Parse(self, resumeFilePath):
        """
        Parse resume
        :param resumeFilePath: resume file path
        :return: XMl string
        """
        pass
