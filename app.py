from flask import Flask
from flask import render_template
from flask import jsonify


from models import League
from indexer import LineupIndexer

lineup_indexer = LineupIndexer()

league = League("the_international_2014")
lineup_indexer.index(league)
lineups = lineup_indexer.get_lineups('Sand King')

app = Flask(__name__)

@app.route('/')
def hello_world():
    return render_template('index.html')

@app.route('/lineups')
def lineups():
    lineup_indexer = LineupIndexer()

    league = League("the_international_2014")
    lineup_indexer.index(league)
    lineups = lineup_indexer.get_lineups('Sand King')

    lineupDict = {'lineups': []}

    for lineup in lineups:
        lineupDict['lineups'].append(lineup.get_object())

    return jsonify(lineupDict)

app.run(host='0.0.0.0', debug=True)
