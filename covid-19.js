let data = await loadData()
let widget = await createWidget(data)

if (!config.runsInWidget) {
  await widget.presentMedium()
}

Script.setWidget(widget)
Script.complete()

async function createWidget(data) {
  
  let w = new ListWidget()
    w.backgroundColor = new Color("#123456")
  let v = data;
   w.addText("Today Positive : " + v.todayCases + " (Total "+ v.cases+")");
   w.addSpacer(1)
   w.addText("Today Deceased : " + v.todayDeaths);
  w.addSpacer(1)
  w.addText("Total Deceased : " + v.deaths);
  w.addSpacer(1)
   w.addText("Active Cases : " + v.active);
  w.addSpacer(1)
   w.addText("Total Tests : " + v.totalTests);
  w.addSpacer(1)
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

