let data = await loadData()
let widget = await createWidget(data)

if (!config.runsInWidget) {
  await widget.presentLarge()
}

Script.setWidget(widget)
Script.complete()

async function createWidget(data) {
  let w = new ListWidget()
  w.backgroundColor = new Color("#2b68a6")
  let title = w.addText("Myanmar COVID-19 stats");
  title.font = Font.mediumSystemFont(20)
  w.addSpacer(8)
  
  let v = data;
  w.addText("Today Positive : " + v.todayCases + " (Total "+ v.cases+")");
  w.addSpacer(1)
  w.addText("Today Deceased : " + v.todayDeaths + " (Total "+ v.deaths+")");
  w.addSpacer(1)
  w.addText("Total Recovered : " + v.recovered);
  w.addSpacer(1)
  w.addText("Current Active : " + v.active);
  w.addSpacer(1)
  w.addText("Positive per One Million : " + v.casesPerOneMillion);
  w.addSpacer(1)
  w.addText("Deaths per One Million : " + v.deathsPerOneMillion);
  w.addSpacer(1)
  w.addText("Total Tests : " + v.totalTests);
  w.addSpacer(1)
  w.addText("Tests per One Million : " + v.testsPerOneMillion);
  w.addSpacer(8)

  let d = new Date()
  d = d.toLocaleString('en-US', { timeZone: 'Asia/Yangon' })
  let ref= w.addText("Refresh at " + d);
  ref.font = Font.footnote()
  console.log(v);
  return w
}
  
async function loadData() {
  let url = "https://coronavirus-19-api.herokuapp.com/countries/Myanmar"
  let req = new Request(url)
  let json = await req.loadJSON()
  return json
}
