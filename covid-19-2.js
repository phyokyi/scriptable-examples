let data = await loadData()
let widget = await createWidget(data)

if (!config.runsInWidget) {
  await widget.presentMedium()
}

Script.setWidget(widget)
Script.complete()

async function createWidget(data) {
  let tcolor = "#000000";
  let imgURL = "https://www.pon-cat.com/application/files/7915/8400/2602/home-banner.jpg"
  
  let w = new ListWidget()
  let title = w.addText("Myanmar COVID-19 stats");
  title.font = Font.mediumSystemFont(20)
  
  
  let imgReq = new Request(imgURL);
  let img = await imgReq.loadImage();
  w.backgroundImage = img;
  
  w.addSpacer(8)
  
  let v = data;
  let t1 = w.addText("Today Positive : " + v.todayCases + " (Total "+ v.cases+")");
  t1.textColor = new Color(tcolor)
  w.addSpacer(1)
  let t2 = w.addText("Today Deceased : " + v.todayDeaths + " (Total "+ v.deaths+")");
  w.addSpacer(1)
  t2.textColor = new Color(tcolor)
  let t3 = w.addText("Total Recovered : " + v.recovered);
  w.addSpacer(1)
  t3.textColor = new Color(tcolor)
  let t4 = w.addText("Current Active : " + v.active);
  t4.textColor = new Color(tcolor)
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
