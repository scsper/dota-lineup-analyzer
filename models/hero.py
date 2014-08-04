class Hero:
    def __init__(self, id, name):
        self.id = id
        self.name = name
    def __str__(self):
        return str(self.name)
    def __cmp__(self, other):
        return self.name.__cmp__(other.name)
    def get_object(self):
        return { 'id': self.id, 'name': self.name }
