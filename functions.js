const cylinderRadius = 25;
const cylinderHeight = 50;
const output = [];
const data = [
  {
    "radialDegree": 0,
    "data": [
      {
        "unitMeasure": 9.8,
        "verticalAngle": 20
      },
      {
        "unitMeasure": 40,
        "verticalAngle": 40
      },
      {
        "unitMeasure": 30,
        "verticalAngle": 60
      }
    ]
  },
  {
    "radialDegree": 45,
    "data": [
      {
        "unitMeasure": 16,
        "verticalAngle": 20
      },
      {
        "unitMeasure": 4,
        "verticalAngle": 40
      },
      {
        "unitMeasure": 20,
        "verticalAngle": 60
      }
    ]
  }
];

// Make JSON for Anatoli
data.forEach((item, index) => {
  output.push({
    radialDegree: item.radialDegree, 
    data: []
  });

  item.data.forEach(dataItem => {
    output[index].data.push(xy(dataItem.unitMeasure, dataItem.verticalAngle, item.radialDegree));
  });
});

function xy(unitMeasure, verticalAngle, radialDegree) {
  // Big triangle
  const line_c = Math.sqrt(Math.pow(cylinderHeight, 2) + Math.pow(cylinderRadius, 2)); // Pythagoras
  
  // Small triangle
  const line_e = (unitMeasure * cylinderRadius) / line_c;
  const line_d = Math.sqrt(Math.pow(unitMeasure, 2) - Math.pow(line_e, 2));

  // x & y
  const radialD = 180 - (90 - radialDegree) - 90;
  const radian = (radialD * Math.PI) / 180
  let y = Math.sin(radian) * line_e;
  if (
    (radialDegree > 90 && radialDegree <= 180) || 
    (radialDegree > 270 && radialDegree < 360)) {
    y = -y;
  } 

  let x = Math.sqrt(Math.pow(line_e, 2) - Math.pow(y, 2));
  if (radialDegree > 180 && radialDegree < 360) {
    x = -x;
  }

  return {
    z: line_d,
    y: y,
    x: x
  }
}

// document.getElementById('showme').append(JSON)
document.addEventListener("DOMContentLoaded", function(event) { 
  var div = document.getElementById('test');
  div.innerHTML += '<code>' + JSON.stringify(output) + '</code>';
});
console.log(output);