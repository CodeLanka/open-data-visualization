window.onload = function () {

  var axisX ={gridColor: "Silver",tickColor: "silver",valueFormatString: "YYYY"}
  var toolTip={shared:true};
  var axisY = {gridColor: "Silver",tickColor: "silver"};

  var dataPoints_total=[],dataPoints_total_obj;
  var dataPoints_female=[],dataPoints_female_obj;
  var dataPoints_male=[],dataPoints_male_obj;


  getDataSet(function  (data) {
    console.log(data);
    var dataset =data;

    var title ={text: "Population Growth Diff between years",fontSize: 30};

    var diff_total = data[0].Total;
    var diff_male = data[0].Male;
    var diff_female = data[0].Female;

    for (var i = 0; i < data.length; i++) {
      //dataPoints_total.push({ x: new Date(data[i].Year,0,0), y: data[i].Total })
      //dataPoints_male.push({ x: new Date(data[i].Year,0,0), y: data[i].Male })
      //dataPoints_female.push({ x: new Date(data[i].Year,0,0), y: data[i].Female })
      diff_total = diff_total - data[i].Total;
      diff_female = diff_female - data[i].Female;
      diff_male = diff_male - data[i].Male;

      dataPoints_total.push ({ x: new Date(data[i].Year,0,0), y: diff_total })
      dataPoints_male.push  ({ x: new Date(data[i].Year,0,0), y: diff_male })
      dataPoints_female.push({ x: new Date(data[i].Year,0,0), y: diff_female })
      
      diff_total =   data[i].Total;
      diff_female =   data[i].Female;
      diff_male =   data[i].Male;
    
    };


    dataPoints_total_obj= {        
        type: "line",
        showInLegend: true,
        lineThickness: 2,
        name: "Total",
        markerType: "square",
        color: "#e67e22",
        dataPoints: dataPoints_total
    }

    dataPoints_male_obj= {        
        type: "line",
        showInLegend: true,
        lineThickness: 2,
        name: "Male",
        markerType: "square",
        color: "#2ecc71",
        dataPoints: dataPoints_male
    }

    dataPoints_female_obj= {        
        type: "line",
        showInLegend: true,
        lineThickness: 2,
        name: "Female",
        markerType: "square",
        color: "#2980b9",
        dataPoints: dataPoints_female
    }

    console.log(dataPoints_total);

    title ={text: "Population Growth Diff between years",fontSize: 30};

    var chart = new CanvasJS.Chart("chartContainer",
    {

      title:title,
      axisX:axisX,                        
      toolTip:toolTip,
      theme: "theme2",
      axisY:axisY,
      legend:{
        verticalAlign: "center",
        horizontalAlign: "right"
      },
      data: [dataPoints_total_obj,dataPoints_male_obj,dataPoints_female_obj],
          legend:{
            cursor:"pointer",
            itemclick:function(e){
              if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                e.dataSeries.visible = false;
              }
              else{
                e.dataSeries.visible = true;
              }
              chart.render();
            }
          }
    });
    chart.render();

  
  /** Setting up the second graph **/
    dataPoints_total=[]
    dataPoints_male=[]
    dataPoints_female=[]

    for ( i = 0; i < dataset.length; i++) {
      
      dataPoints_total.push({ x: new Date(dataset[i].Year,0,0), y: dataset[i].Total });
      dataPoints_male.push({ x: new Date(dataset[i].Year,0,0), y: dataset[i].Male });
      dataPoints_female.push({ x: new Date(dataset[i].Year,0,0), y: dataset[i].Female });
    };

    dataPoints_total_obj= {        
        type: "line",
        showInLegend: true,
        lineThickness: 2,
        name: "Total",
        markerType: "square",
        color: "#e67e22",
        dataPoints: dataPoints_total
    }

    dataPoints_male_obj= {        
        type: "line",
        showInLegend: true,
        lineThickness: 2,
        name: "Male",
        markerType: "square",
        color: "#2ecc71",
        dataPoints: dataPoints_male
    }

    dataPoints_female_obj= {        
        type: "line",
        showInLegend: true,
        lineThickness: 2,
        name: "Female",
        markerType: "square",
        color: "#2980b9",
        dataPoints: dataPoints_female
    }

    var chartTwo = new CanvasJS.Chart("chartContainer2",
    {

      title:title,
      axisX:axisX,                        
      toolTip:toolTip,
      theme: "theme2",
      axisY:axisY,
      legend:{
        verticalAlign: "center",
        horizontalAlign: "right"
      },
      data: [dataPoints_total_obj,dataPoints_male_obj,dataPoints_female_obj],
          legend:{
            cursor:"pointer",
            itemclick:function(e){
              if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                e.dataSeries.visible = false;
              }
              else{
                e.dataSeries.visible = true;
              }
              chartTwo.render();
            }
          }
    });

    chartTwo.render();
  })

}


function getDataSet (cb) {
  console.log("getDataSet");
  var url = "https://cdn.rawgit.com/CodeLanka/open-data-api/master/dataset/annual_population_growth_rate/APGR_json_csv.json";

  // Raw git dev
  url = "https://rawgit.com/CodeLanka/open-data-api/master/dataset/annual_population_growth_rate/APGR_json_csv.json";
 
  $.ajax(url, {
      dataType: "JSON",
      success: function(data) {
        return cb(data.data);
      },
      error: function(jqXHR, textStatus, errorThrown) {
          console.log(textStatus); //error logging
      }
  });

}
