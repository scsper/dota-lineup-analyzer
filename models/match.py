class Match:
    def __init__(self, match):
        self.id = match['match_id']
        # self.radiant = Lineup()
        # self.dire = Lineup()
        self.winner = '' # Radiant or Dire

    def __unicode__(self):
        print self.id
