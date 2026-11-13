const money = value => new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(value);
const number = value => new Intl.NumberFormat("en-IN").format(value);
const $ = id => document.getElementById(id);
let salesData = [];
let trendChart = null, mixChart = null, categoryChart = null;
const chartColors = ["#5969df","#34a889","#e7a64c","#a17ae8","#e47787"];
const formatShort = value => new Intl.NumberFormat("en-IN",{notation:"compact",maximumFractionDigits:1}).format(value);

async function initDashboard(){
  $("year").textContent = new Date().getFullYear();
  try {
    const response = await fetch("../data/sample-sales.json");
    if (!response.ok) throw new Error("Could not load sample data");
    salesData = await response.json();
    ["channelFilter","categoryFilter","periodFilter"].forEach(id => $(id).addEventListener("change", renderDashboard));
    $("resetFilters").addEventListener("click", () => { $("channelFilter").value="All"; $("categoryFilter").value="All"; $("periodFilter").value="90"; renderDashboard(); });
    $("downloadCsv").addEventListener("click", exportCsv);
    renderDashboard();
  } catch (error) {
    $("load-error").style.display = "block";
    document.querySelectorAll(".dashboard-kpi strong").forEach(el => el.textContent = "—");
    $("skuTable").innerHTML = '<tr><td colspan="6">Unable to load sample data. Make sure you are viewing this through GitHub Pages or a local web server, not opening the HTML file directly.</td></tr>';
  }
}
function getFilteredData(){
  const channel = $("channelFilter").value, category = $("categoryFilter").value, days = Number($("periodFilter").value);
  const latest = salesData.reduce((max,row)=>row.date>max?row.date:max,"");
  const end = new Date(latest+"T00:00:00");
  const cutoff = new Date(end); cutoff.setDate(cutoff.getDate()-(days-1));
  const cutoffString = cutoff.toISOString().slice(0,10);
  return salesData.filter(row => row.date >= cutoffString && row.date <= latest &&
    (channel==="All" || row.channel===channel) && (category==="All" || row.category===category));
}
function sum(rows,key){return rows.reduce((total,row)=>total+Number(row[key]||0),0)}
function groupSum(rows,key,valueKey){const result={};rows.forEach(r=>result[r[key]]=(result[r[key]]||0)+Number(r[valueKey]||0));return result}
function aggregateDaily(rows){const map=groupSum(rows,"date","net_sales");return Object.keys(map).sort().map(date=>({date,value:map[date]}))}
function renderDashboard(){
  const rows=getFilteredData();
  const sales=sum(rows,"net_sales"), orders=sum(rows,"orders"), units=sum(rows,"units");
  $("kpiSales").textContent=money(sales); $("kpiOrders").textContent=number(orders);
  $("kpiAov").textContent=money(orders?sales/orders:0); $("kpiUnits").textContent=number(units);
  renderTrend(rows); renderMix(rows); renderCategories(rows); renderInsights(rows); renderTable(rows);
}
function renderTrend(rows){
  const points=aggregateDaily(rows);
  if(trendChart)trendChart.destroy();
  trendChart=new Chart($("salesTrend"),{type:"line",data:{labels:points.map(p=>p.date.slice(5)),datasets:[{label:"Net sales",data:points.map(p=>p.value),borderColor:chartColors[0],backgroundColor:"rgba(89,105,223,.10)",fill:true,tension:.32,pointRadius:0,pointHoverRadius:4,borderWidth:2}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>money(c.raw)}}},scales:{x:{grid:{display:false},ticks:{maxTicksLimit:7,color:"#8a90a0",font:{size:9}}},y:{grid:{color:"#f0f1f6"},ticks:{color:"#8a90a0",font:{size:9},callback:v=>formatShort(v)},beginAtZero:true}}}});
}
function renderMix(rows){
  const grouped=groupSum(rows,"channel","net_sales");
  const labels=Object.keys(grouped), values=labels.map(k=>grouped[k]);
  if(mixChart)mixChart.destroy();
  mixChart=new Chart($("channelMix"),{type:"doughnut",data:{labels,datasets:[{data:values,backgroundColor:chartColors,borderWidth:3,borderColor:"#fff",hoverOffset:5}]},options:{responsive:true,maintainAspectRatio:false,cutout:"67%",plugins:{legend:{position:"bottom",labels:{usePointStyle:true,pointStyle:"circle",boxWidth:7,padding:14,font:{size:10}}},tooltip:{callbacks:{label:c=>`${c.label}: ${money(c.raw)} (${values.reduce((a,b)=>a+b,0)?(c.raw/values.reduce((a,b)=>a+b,0)*100).toFixed(1):0}%)`}}}}});
}
function renderCategories(rows){
  const grouped=groupSum(rows,"category","net_sales");
  const labels=Object.keys(grouped), values=labels.map(k=>grouped[k]);
  if(categoryChart)categoryChart.destroy();
  categoryChart=new Chart($("categoryChart"),{type:"bar",data:{labels,datasets:[{data:values,backgroundColor:chartColors.slice(0,labels.length),borderRadius:5,maxBarThickness:46}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>money(c.raw)}}},scales:{x:{grid:{display:false},ticks:{color:"#73798b",font:{size:10}}},y:{grid:{color:"#f0f1f6"},ticks:{color:"#8a90a0",font:{size:9},callback:v=>formatShort(v)},beginAtZero:true}}}});
}
function renderInsights(rows){
  const host=$("insights");
  if(!rows.length){host.innerHTML='<p class="muted small">No rows match the selected filters. Try another marketplace, category, or period.</p>';return}
  const salesByChannel=groupSum(rows,"channel","net_sales");
  const topChannel=Object.entries(salesByChannel).sort((a,b)=>b[1]-a[1])[0];
  const salesByCategory=groupSum(rows,"category","net_sales");
  const topCategory=Object.entries(salesByCategory).sort((a,b)=>b[1]-a[1])[0];
  const daily=aggregateDaily(rows);
  const averageDay=daily.length?sum(daily,"value")/daily.length:0;
  const peak=daily.reduce((best,p)=>p.value>best.value?p:best,{date:"—",value:0});
  host.innerHTML=`<div class="insight-row"><span class="insight-icon">↗</span><div><b>Leading marketplace</b><p>${topChannel[0]} contributes ${(salesByChannel[topChannel[0]]/sum(rows,"net_sales")*100).toFixed(1)}% of the filtered sales.</p></div></div>
  <div class="insight-row"><span class="insight-icon">▦</span><div><b>Top category</b><p>${topCategory[0]} leads with ${money(topCategory[1])} in net sales.</p></div></div>
  <div class="insight-row"><span class="insight-icon">◷</span><div><b>Average daily sales</b><p>${money(averageDay)} across ${daily.length} days with recorded sales.</p></div></div>
  <div class="insight-row"><span class="insight-icon">★</span><div><b>Highest sales day</b><p>${peak.date}: ${money(peak.value)} in sample net sales.</p></div></div>`;
}
function renderTable(rows){
  const map={};
  rows.forEach(r=>{if(!map[r.sku])map[r.sku]={...r,units:0,orders:0,net_sales:0};map[r.sku].units+=r.units;map[r.sku].orders+=r.orders;map[r.sku].net_sales+=r.net_sales});
  const sorted=Object.values(map).sort((a,b)=>b.net_sales-a.net_sales);
  $("skuTable").innerHTML=sorted.length?sorted.map(r=>`<tr><td>${r.sku}</td><td>${r.product}</td><td>${r.category}</td><td>${number(r.units)}</td><td>${number(r.orders)}</td><td>${money(r.net_sales)}</td></tr>`).join(""):'<tr><td colspan="6">No data matches the current filters.</td></tr>';
  $("tableCount").textContent=`Showing ${sorted.length} SKUs · ${rows.length} sample records`;
}
function exportCsv(){
  const rows=getFilteredData();
  if(!rows.length){alert("No data to export for the selected filters.");return}
  const headers=["date","channel","category","sku","product","units","orders","gross_sales","discounts","returns","net_sales"];
  const escape=value=>`"${String(value??"").replace(/"/g,'""')}"`;
  const csv=[headers.join(","),...rows.map(row=>headers.map(h=>escape(row[h])).join(","))].join("\r\n");
  const blob=new Blob(["\ufeff"+csv],{type:"text/csv;charset=utf-8;"});
  const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="sample-marketplace-sales.csv";a.click();URL.revokeObjectURL(url);
}
document.addEventListener("DOMContentLoaded",initDashboard);