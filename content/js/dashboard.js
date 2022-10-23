/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.6434782608695652, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/products-20"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/products-21"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/products-22"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/products-17"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/products-18"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/products-19"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/products-13"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/products-14"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/products-15"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/products-16"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/products-10"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/products-11"], "isController": false}, {"data": [0.0, 500, 1500, "https://www.banglapuzzle.com/products-12"], "isController": false}, {"data": [0.0, 500, 1500, "https://www.banglapuzzle.com/"], "isController": false}, {"data": [0.0, 500, 1500, "https://www.banglapuzzle.com/products"], "isController": false}, {"data": [0.0, 500, 1500, "https://www.banglapuzzle.com/-53"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/-51"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/-52"], "isController": false}, {"data": [0.0, 500, 1500, "https://www.banglapuzzle.com/-50"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/news-10"], "isController": false}, {"data": [0.0, 500, 1500, "https://www.banglapuzzle.com/news"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/news-11"], "isController": false}, {"data": [0.0, 500, 1500, "https://www.banglapuzzle.com/news-12"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/news-13"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/news-14"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/news-15"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/news-16"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/news-17"], "isController": false}, {"data": [0.0, 500, 1500, "Test"], "isController": true}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/news-18"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/news-19"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/-48"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/-49"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/-46"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/-47"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/-44"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/-45"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/-42"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/-43"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/-40"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/news-9"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/-41"], "isController": false}, {"data": [0.0, 500, 1500, "https://www.banglapuzzle.com/news-7"], "isController": false}, {"data": [0.0, 500, 1500, "https://www.banglapuzzle.com/news-8"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/news-1"], "isController": false}, {"data": [0.25, 500, 1500, "https://www.banglapuzzle.com/news-2"], "isController": false}, {"data": [0.0, 500, 1500, "https://www.banglapuzzle.com/news-0"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/news-5"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/news-6"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/news-20"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/news-3"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/news-21"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/news-4"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/news-22"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/news-23"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/news-24"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/news-25"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/news-26"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/news-27"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/-39"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/-37"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/-38"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/-35"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/-36"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/-33"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/-34"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/-31"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/-32"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/-30"], "isController": false}, {"data": [0.25, 500, 1500, "https://www.banglapuzzle.com/-0"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/-1"], "isController": false}, {"data": [0.0, 500, 1500, "https://www.banglapuzzle.com/-8"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/-9"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/-6"], "isController": false}, {"data": [0.0, 500, 1500, "https://www.banglapuzzle.com/-7"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/-4"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/-5"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/-2"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/-28"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/-3"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/-29"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/-26"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/-27"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/-24"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/-25"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/-22"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/-23"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/-20"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/-21"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/products-4"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/products-5"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/products-2"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/products-3"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/-19"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/products-0"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/products-1"], "isController": false}, {"data": [0.0, 500, 1500, "https://www.banglapuzzle.com/-17"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/-18"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/-15"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/-16"], "isController": false}, {"data": [0.0, 500, 1500, "https://www.banglapuzzle.com/-13"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/-14"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/-11"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/products-8"], "isController": false}, {"data": [0.0, 500, 1500, "https://www.banglapuzzle.com/-12"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/products-9"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.banglapuzzle.com/products-6"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/-10"], "isController": false}, {"data": [0.5, 500, 1500, "https://www.banglapuzzle.com/products-7"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 114, 0, 0.0, 1136.5350877192986, 24, 12600, 539.0, 2327.5, 5534.0, 12194.249999999985, 2.9937760970613723, 276.32551324220697, 6.520213322960162], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["https://www.banglapuzzle.com/products-20", 1, 0, 0.0, 273.0, 273, 273, 273.0, 273.0, 273.0, 273.0, 3.663003663003663, 0.9050194597069596, 4.5966403388278385], "isController": false}, {"data": ["https://www.banglapuzzle.com/products-21", 1, 0, 0.0, 81.0, 81, 81, 81.0, 81.0, 81.0, 81.0, 12.345679012345679, 3.255208333333333, 6.8841628086419755], "isController": false}, {"data": ["https://www.banglapuzzle.com/products-22", 1, 0, 0.0, 25.0, 25, 25, 25.0, 25.0, 25.0, 25.0, 40.0, 22.7734375, 24.765625], "isController": false}, {"data": ["https://www.banglapuzzle.com/products-17", 1, 0, 0.0, 269.0, 269, 269, 269.0, 269.0, 269.0, 269.0, 3.717472118959108, 0.9184769981412639, 4.675882899628252], "isController": false}, {"data": ["https://www.banglapuzzle.com/products-18", 1, 0, 0.0, 270.0, 270, 270, 270.0, 270.0, 270.0, 270.0, 3.7037037037037037, 0.9150752314814814, 4.669415509259259], "isController": false}, {"data": ["https://www.banglapuzzle.com/products-19", 1, 0, 0.0, 269.0, 269, 269, 269.0, 269.0, 269.0, 269.0, 3.717472118959108, 0.9184769981412639, 4.697664962825279], "isController": false}, {"data": ["https://www.banglapuzzle.com/products-13", 1, 0, 0.0, 319.0, 319, 319, 319.0, 319.0, 319.0, 319.0, 3.134796238244514, 0.7745150862068966, 4.004212382445141], "isController": false}, {"data": ["https://www.banglapuzzle.com/products-14", 1, 0, 0.0, 272.0, 272, 272, 272.0, 272.0, 272.0, 272.0, 3.676470588235294, 0.9083467371323529, 4.670984604779411], "isController": false}, {"data": ["https://www.banglapuzzle.com/products-15", 1, 0, 0.0, 273.0, 273, 273, 273.0, 273.0, 273.0, 273.0, 3.663003663003663, 0.9050194597069596, 4.718263507326007], "isController": false}, {"data": ["https://www.banglapuzzle.com/products-16", 1, 0, 0.0, 271.0, 271, 271, 271.0, 271.0, 271.0, 271.0, 3.6900369003690034, 0.911698570110701, 4.695427813653136], "isController": false}, {"data": ["https://www.banglapuzzle.com/products-10", 1, 0, 0.0, 119.0, 119, 119, 119.0, 119.0, 119.0, 119.0, 8.403361344537815, 5.84296218487395, 4.718684348739496], "isController": false}, {"data": ["https://www.banglapuzzle.com/products-11", 1, 0, 0.0, 269.0, 269, 269, 269.0, 269.0, 269.0, 269.0, 3.717472118959108, 0.9184769981412639, 4.650470492565056], "isController": false}, {"data": ["https://www.banglapuzzle.com/products-12", 1, 0, 0.0, 7454.0, 7454, 7454, 7454.0, 7454.0, 7454.0, 7454.0, 0.13415615776764153, 244.41470183793936, 0.16402686477059297], "isController": false}, {"data": ["https://www.banglapuzzle.com/", 1, 0, 0.0, 12600.0, 12600, 12600, 12600.0, 12600.0, 12600.0, 12600.0, 0.07936507936507936, 161.64853050595238, 4.96062748015873], "isController": false}, {"data": ["https://www.banglapuzzle.com/products", 1, 0, 0.0, 9895.0, 9895, 9895, 9895.0, 9895.0, 9895.0, 9895.0, 0.10106114199090449, 214.29472350303183, 2.5762695805962608], "isController": false}, {"data": ["https://www.banglapuzzle.com/-53", 1, 0, 0.0, 1967.0, 1967, 1967, 1967.0, 1967.0, 1967.0, 1967.0, 0.5083884087442806, 0.7382554334011184, 0.2541942043721403], "isController": false}, {"data": ["https://www.banglapuzzle.com/-51", 1, 0, 0.0, 271.0, 271, 271, 271.0, 271.0, 271.0, 271.0, 3.6900369003690034, 24.18703874538745, 4.450386300738007], "isController": false}, {"data": ["https://www.banglapuzzle.com/-52", 1, 0, 0.0, 829.0, 829, 829, 829.0, 829.0, 829.0, 829.0, 1.2062726176115801, 108.09804734620025, 0.6078483112183354], "isController": false}, {"data": ["https://www.banglapuzzle.com/-50", 1, 0, 0.0, 1869.0, 1869, 1869, 1869.0, 1869.0, 1869.0, 1869.0, 0.5350454788657035, 23.359124197431782, 0.6499966559657571], "isController": false}, {"data": ["https://www.banglapuzzle.com/news-10", 1, 0, 0.0, 119.0, 119, 119, 119.0, 119.0, 119.0, 119.0, 8.403361344537815, 5.84296218487395, 4.718684348739496], "isController": false}, {"data": ["https://www.banglapuzzle.com/news", 1, 0, 0.0, 7335.0, 7335, 7335, 7335.0, 7335.0, 7335.0, 7335.0, 0.136332651670075, 126.90546182685753, 4.516019086571234], "isController": false}, {"data": ["https://www.banglapuzzle.com/news-11", 1, 0, 0.0, 541.0, 541, 541, 541.0, 541.0, 541.0, 541.0, 1.8484288354898337, 27.897917629390015, 2.2527726432532345], "isController": false}, {"data": ["https://www.banglapuzzle.com/news-12", 1, 0, 0.0, 2220.0, 2220, 2220, 2220.0, 2220.0, 2220.0, 2220.0, 0.45045045045045046, 46.78394214527027, 0.5489864864864864], "isController": false}, {"data": ["https://www.banglapuzzle.com/news-13", 1, 0, 0.0, 552.0, 552, 552, 552.0, 552.0, 552.0, 552.0, 1.8115942028985508, 28.359233469202895, 2.2556470788043477], "isController": false}, {"data": ["https://www.banglapuzzle.com/news-14", 1, 0, 0.0, 274.0, 274, 274, 274.0, 274.0, 274.0, 274.0, 3.6496350364963503, 40.880189324817515, 4.519274635036496], "isController": false}, {"data": ["https://www.banglapuzzle.com/news-15", 1, 0, 0.0, 545.0, 545, 545, 545.0, 545.0, 545.0, 545.0, 1.834862385321101, 32.84475344036697, 2.304329128440367], "isController": false}, {"data": ["https://www.banglapuzzle.com/news-16", 1, 0, 0.0, 542.0, 542, 542, 542.0, 542.0, 542.0, 542.0, 1.8450184501845017, 32.428361392988926, 2.288255304428044], "isController": false}, {"data": ["https://www.banglapuzzle.com/news-17", 1, 0, 0.0, 269.0, 269, 269, 269.0, 269.0, 269.0, 269.0, 3.717472118959108, 0.9184769981412639, 4.679513243494424], "isController": false}, {"data": ["Test", 1, 0, 0.0, 29831.0, 29831, 29831, 29831.0, 29831.0, 29831.0, 29831.0, 0.03352217491870872, 170.56315027781503, 4.0602424910328185], "isController": true}, {"data": ["https://www.banglapuzzle.com/news-18", 1, 0, 0.0, 270.0, 270, 270, 270.0, 270.0, 270.0, 270.0, 3.7037037037037037, 0.9150752314814814, 4.673032407407407], "isController": false}, {"data": ["https://www.banglapuzzle.com/news-19", 1, 0, 0.0, 269.0, 269, 269, 269.0, 269.0, 269.0, 269.0, 3.717472118959108, 0.9184769981412639, 4.755750464684015], "isController": false}, {"data": ["https://www.banglapuzzle.com/-48", 1, 0, 0.0, 270.0, 270, 270, 270.0, 270.0, 270.0, 270.0, 3.7037037037037037, 22.337962962962962, 4.477719907407407], "isController": false}, {"data": ["https://www.banglapuzzle.com/-49", 1, 0, 0.0, 821.0, 821, 821, 821.0, 821.0, 821.0, 821.0, 1.2180267965895248, 71.90759173264313, 1.4761438032886725], "isController": false}, {"data": ["https://www.banglapuzzle.com/-46", 1, 0, 0.0, 550.0, 550, 550, 550.0, 550.0, 550.0, 550.0, 1.8181818181818181, 49.43536931818181, 2.2230113636363633], "isController": false}, {"data": ["https://www.banglapuzzle.com/-47", 1, 0, 0.0, 180.0, 180, 180, 180.0, 180.0, 180.0, 180.0, 5.555555555555555, 10.66623263888889, 2.9893663194444446], "isController": false}, {"data": ["https://www.banglapuzzle.com/-44", 1, 0, 0.0, 533.0, 533, 533, 533.0, 533.0, 533.0, 533.0, 1.876172607879925, 23.681182575046904, 2.2975785647279547], "isController": false}, {"data": ["https://www.banglapuzzle.com/-45", 1, 0, 0.0, 544.0, 544, 544, 544.0, 544.0, 544.0, 544.0, 1.838235294117647, 38.97633272058823, 2.263686236213235], "isController": false}, {"data": ["https://www.banglapuzzle.com/-42", 1, 0, 0.0, 278.0, 278, 278, 278.0, 278.0, 278.0, 278.0, 3.5971223021582737, 39.28732014388489, 4.338326214028776], "isController": false}, {"data": ["https://www.banglapuzzle.com/-43", 1, 0, 0.0, 542.0, 542, 542, 542.0, 542.0, 542.0, 542.0, 1.8450184501845017, 24.823065613468632, 2.221589598708487], "isController": false}, {"data": ["https://www.banglapuzzle.com/-40", 1, 0, 0.0, 277.0, 277, 277, 277.0, 277.0, 277.0, 277.0, 3.6101083032490977, 27.273240072202164, 4.353988041516245], "isController": false}, {"data": ["https://www.banglapuzzle.com/news-9", 1, 0, 0.0, 405.0, 405, 405, 405.0, 405.0, 405.0, 405.0, 2.4691358024691357, 523.9221643518518, 1.2731481481481481], "isController": false}, {"data": ["https://www.banglapuzzle.com/-41", 1, 0, 0.0, 275.0, 275, 275, 275.0, 275.0, 275.0, 275.0, 3.6363636363636362, 27.833806818181817, 4.378551136363636], "isController": false}, {"data": ["https://www.banglapuzzle.com/news-7", 1, 0, 0.0, 5471.0, 5471, 5471, 5471.0, 5471.0, 5471.0, 5471.0, 0.18278194114421495, 20.484072267409978, 0.5554857430085908], "isController": false}, {"data": ["https://www.banglapuzzle.com/news-8", 1, 0, 0.0, 1874.0, 1874, 1874, 1874.0, 1874.0, 1874.0, 1874.0, 0.5336179295624334, 46.82966332043756, 0.6539946304695837], "isController": false}, {"data": ["https://www.banglapuzzle.com/news-1", 2, 0, 0.0, 152.0, 33, 271, 152.0, 271.0, 271.0, 271.0, 0.41339396444811904, 0.40491615853658536, 0.37302346010748244], "isController": false}, {"data": ["https://www.banglapuzzle.com/news-2", 2, 0, 0.0, 2601.0, 809, 4393, 2601.0, 4393.0, 4393.0, 4393.0, 0.3562522265764161, 32.62386722924831, 0.43887908576772355], "isController": false}, {"data": ["https://www.banglapuzzle.com/news-0", 2, 0, 0.0, 3185.5, 1711, 4660, 3185.5, 4660.0, 4660.0, 4660.0, 0.30656039239730226, 17.98841896267627, 0.3685310967198038], "isController": false}, {"data": ["https://www.banglapuzzle.com/news-5", 1, 0, 0.0, 1133.0, 1133, 1133, 1133.0, 1133.0, 1133.0, 1133.0, 0.88261253309797, 1.1739436231244484, 1.0929225507502207], "isController": false}, {"data": ["https://www.banglapuzzle.com/news-6", 1, 0, 0.0, 141.0, 141, 141, 141.0, 141.0, 141.0, 141.0, 7.092198581560283, 107.63658023049646, 4.501883865248227], "isController": false}, {"data": ["https://www.banglapuzzle.com/news-20", 1, 0, 0.0, 270.0, 270, 270, 270.0, 270.0, 270.0, 270.0, 3.7037037037037037, 0.9150752314814814, 4.709201388888888], "isController": false}, {"data": ["https://www.banglapuzzle.com/news-3", 1, 0, 0.0, 960.0, 960, 960, 960.0, 960.0, 960.0, 960.0, 1.0416666666666667, 0.2573649088541667, 1.318359375], "isController": false}, {"data": ["https://www.banglapuzzle.com/news-21", 1, 0, 0.0, 272.0, 272, 272, 272.0, 272.0, 272.0, 272.0, 3.676470588235294, 33.04874195772059, 4.426843979779411], "isController": false}, {"data": ["https://www.banglapuzzle.com/news-4", 1, 0, 0.0, 980.0, 980, 980, 980.0, 980.0, 980.0, 980.0, 1.0204081632653061, 3.6870216836734695, 1.2585698341836735], "isController": false}, {"data": ["https://www.banglapuzzle.com/news-22", 1, 0, 0.0, 272.0, 272, 272, 272.0, 272.0, 272.0, 272.0, 3.676470588235294, 22.173713235294116, 4.505830652573529], "isController": false}, {"data": ["https://www.banglapuzzle.com/news-23", 1, 0, 0.0, 1082.0, 1082, 1082, 1082.0, 1082.0, 1082.0, 1082.0, 0.9242144177449169, 54.562045113216264, 1.1354118530499075], "isController": false}, {"data": ["https://www.banglapuzzle.com/news-24", 1, 0, 0.0, 810.0, 810, 810, 810.0, 810.0, 810.0, 810.0, 1.2345679012345678, 53.8990162037037, 1.5203028549382716], "isController": false}, {"data": ["https://www.banglapuzzle.com/news-25", 1, 0, 0.0, 273.0, 273, 273, 273.0, 273.0, 273.0, 273.0, 3.663003663003663, 24.00984432234432, 4.478594322344322], "isController": false}, {"data": ["https://www.banglapuzzle.com/news-26", 1, 0, 0.0, 78.0, 78, 78, 78.0, 78.0, 78.0, 78.0, 12.82051282051282, 3.3804086538461537, 7.148938301282051], "isController": false}, {"data": ["https://www.banglapuzzle.com/news-27", 1, 0, 0.0, 24.0, 24, 24, 24.0, 24.0, 24.0, 24.0, 41.666666666666664, 23.722330729166668, 25.797526041666668], "isController": false}, {"data": ["https://www.banglapuzzle.com/-39", 1, 0, 0.0, 539.0, 539, 539, 539.0, 539.0, 539.0, 539.0, 1.8552875695732838, 23.160293947124302, 2.2339546614100185], "isController": false}, {"data": ["https://www.banglapuzzle.com/-37", 1, 0, 0.0, 277.0, 277, 277, 277.0, 277.0, 277.0, 277.0, 3.6101083032490977, 21.064840929602887, 4.389243005415162], "isController": false}, {"data": ["https://www.banglapuzzle.com/-38", 1, 0, 0.0, 273.0, 273, 273, 273.0, 273.0, 273.0, 273.0, 3.663003663003663, 31.847384386446883, 4.410628434065933], "isController": false}, {"data": ["https://www.banglapuzzle.com/-35", 1, 0, 0.0, 271.0, 271, 271, 271.0, 271.0, 271.0, 271.0, 3.6900369003690034, 44.89665013837638, 4.439575645756458], "isController": false}, {"data": ["https://www.banglapuzzle.com/-36", 1, 0, 0.0, 272.0, 272, 272, 272.0, 272.0, 272.0, 272.0, 3.676470588235294, 30.90533088235294, 4.430434283088235], "isController": false}, {"data": ["https://www.banglapuzzle.com/-33", 1, 0, 0.0, 552.0, 552, 552, 552.0, 552.0, 552.0, 552.0, 1.8115942028985508, 33.72325067934782, 2.183112545289855], "isController": false}, {"data": ["https://www.banglapuzzle.com/-34", 1, 0, 0.0, 277.0, 277, 277, 277.0, 277.0, 277.0, 277.0, 3.6101083032490977, 35.487646660649816, 4.350462545126353], "isController": false}, {"data": ["https://www.banglapuzzle.com/-31", 1, 0, 0.0, 276.0, 276, 276, 276.0, 276.0, 276.0, 276.0, 3.6231884057971016, 30.896173007246375, 4.359148550724638], "isController": false}, {"data": ["https://www.banglapuzzle.com/-32", 1, 0, 0.0, 275.0, 275, 275, 275.0, 275.0, 275.0, 275.0, 3.6363636363636362, 23.501420454545453, 4.375], "isController": false}, {"data": ["https://www.banglapuzzle.com/-30", 1, 0, 0.0, 271.0, 271, 271, 271.0, 271.0, 271.0, 271.0, 3.6900369003690034, 21.415907518450183, 4.439575645756458], "isController": false}, {"data": ["https://www.banglapuzzle.com/-0", 2, 0, 0.0, 2516.0, 1367, 3665, 2516.0, 3665.0, 3665.0, 3665.0, 0.3572704537334762, 25.68439621293319, 0.30284253304751696], "isController": false}, {"data": ["https://www.banglapuzzle.com/-1", 2, 0, 0.0, 392.0, 299, 485, 392.0, 485.0, 485.0, 485.0, 0.8576329331046312, 66.1453587317753, 0.7441473252572899], "isController": false}, {"data": ["https://www.banglapuzzle.com/-8", 1, 0, 0.0, 2647.0, 2647, 2647, 2647.0, 2647.0, 2647.0, 2647.0, 0.3777861730260672, 33.15405706932376, 0.4567375802795618], "isController": false}, {"data": ["https://www.banglapuzzle.com/-9", 1, 0, 0.0, 1254.0, 1254, 1254, 1254.0, 1254.0, 1254.0, 1254.0, 0.7974481658692185, 169.2209928229665, 0.41118421052631576], "isController": false}, {"data": ["https://www.banglapuzzle.com/-6", 1, 0, 0.0, 621.0, 621, 621, 621.0, 621.0, 621.0, 621.0, 1.6103059581320451, 24.439223530595815, 0.9435386473429952], "isController": false}, {"data": ["https://www.banglapuzzle.com/-7", 1, 0, 0.0, 2028.0, 2028, 2028, 2028.0, 2028.0, 2028.0, 2028.0, 0.4930966469428008, 115.38076306706114, 1.4802530202169626], "isController": false}, {"data": ["https://www.banglapuzzle.com/-4", 1, 0, 0.0, 1125.0, 1125, 1125, 1125.0, 1125.0, 1125.0, 1125.0, 0.888888888888889, 3.2118055555555554, 1.0815972222222223], "isController": false}, {"data": ["https://www.banglapuzzle.com/-5", 1, 0, 0.0, 1101.0, 1101, 1101, 1101.0, 1101.0, 1101.0, 1101.0, 0.9082652134423251, 1.2080636920980927, 1.1096091621253406], "isController": false}, {"data": ["https://www.banglapuzzle.com/-2", 2, 0, 0.0, 3015.5, 308, 5723, 3015.5, 5723.0, 5723.0, 5723.0, 0.34946706272933775, 26.69617797702254, 0.4332504259129827], "isController": false}, {"data": ["https://www.banglapuzzle.com/-28", 1, 0, 0.0, 1082.0, 1082, 1082, 1082.0, 1082.0, 1082.0, 1082.0, 0.9242144177449169, 28.495407809611827, 1.16068334103512], "isController": false}, {"data": ["https://www.banglapuzzle.com/-3", 1, 0, 0.0, 1481.0, 1481, 1481, 1481.0, 1481.0, 1481.0, 1481.0, 0.675219446320054, 20.672001603646184, 0.8216049122214719], "isController": false}, {"data": ["https://www.banglapuzzle.com/-29", 1, 0, 0.0, 539.0, 539, 539, 539.0, 539.0, 539.0, 539.0, 1.8552875695732838, 19.59828675788497, 2.23576646567718], "isController": false}, {"data": ["https://www.banglapuzzle.com/-26", 1, 0, 0.0, 550.0, 550, 550, 550.0, 550.0, 550.0, 550.0, 1.8181818181818181, 61.315696022727266, 2.2230113636363633], "isController": false}, {"data": ["https://www.banglapuzzle.com/-27", 1, 0, 0.0, 546.0, 546, 546, 546.0, 546.0, 546.0, 546.0, 1.8315018315018314, 25.329813415750912, 2.216045673076923], "isController": false}, {"data": ["https://www.banglapuzzle.com/-24", 1, 0, 0.0, 546.0, 546, 546, 546.0, 546.0, 546.0, 546.0, 1.8315018315018314, 36.4905277014652, 2.221411401098901], "isController": false}, {"data": ["https://www.banglapuzzle.com/-25", 1, 0, 0.0, 275.0, 275, 275, 275.0, 275.0, 275.0, 275.0, 3.6363636363636362, 54.460227272727266, 4.4744318181818175], "isController": false}, {"data": ["https://www.banglapuzzle.com/-22", 1, 0, 0.0, 553.0, 553, 553, 553.0, 553.0, 553.0, 553.0, 1.8083182640144664, 31.783312613019888, 2.212717563291139], "isController": false}, {"data": ["https://www.banglapuzzle.com/-23", 1, 0, 0.0, 805.0, 805, 805, 805.0, 805.0, 805.0, 805.0, 1.2422360248447206, 17.015236801242235, 1.5030570652173911], "isController": false}, {"data": ["https://www.banglapuzzle.com/-20", 1, 0, 0.0, 538.0, 538, 538, 538.0, 538.0, 538.0, 538.0, 1.858736059479554, 20.820022072490705, 2.2707800882899627], "isController": false}, {"data": ["https://www.banglapuzzle.com/-21", 1, 0, 0.0, 539.0, 539, 539, 539.0, 539.0, 539.0, 539.0, 1.8552875695732838, 33.210372217068645, 2.299179615027829], "isController": false}, {"data": ["https://www.banglapuzzle.com/products-4", 1, 0, 0.0, 1154.0, 1154, 1154, 1154.0, 1154.0, 1154.0, 1154.0, 0.8665511265164644, 0.21409905762564993, 1.0967287694974004], "isController": false}, {"data": ["https://www.banglapuzzle.com/products-5", 1, 0, 0.0, 1078.0, 1078, 1078, 1078.0, 1078.0, 1078.0, 1078.0, 0.9276437847866419, 0.22919323979591835, 1.178578675788497], "isController": false}, {"data": ["https://www.banglapuzzle.com/products-2", 1, 0, 0.0, 269.0, 269, 269, 269.0, 269.0, 269.0, 269.0, 3.717472118959108, 0.9184769981412639, 4.694034618959107], "isController": false}, {"data": ["https://www.banglapuzzle.com/products-3", 1, 0, 0.0, 1305.0, 1305, 1305, 1305.0, 1305.0, 1305.0, 1305.0, 0.7662835249042146, 23.45994971264368, 0.9451329022988506], "isController": false}, {"data": ["https://www.banglapuzzle.com/-19", 1, 0, 0.0, 591.0, 591, 591, 591.0, 591.0, 591.0, 591.0, 1.6920473773265652, 26.487811971235196, 2.0787066412859563], "isController": false}, {"data": ["https://www.banglapuzzle.com/products-0", 1, 0, 0.0, 1409.0, 1409, 1409, 1409.0, 1409.0, 1409.0, 1409.0, 0.7097232079489, 25.088438165365506, 0.8414101312987935], "isController": false}, {"data": ["https://www.banglapuzzle.com/products-1", 1, 0, 0.0, 955.0, 955, 955, 955.0, 955.0, 955.0, 955.0, 1.0471204188481678, 0.25871236910994766, 1.312990837696335], "isController": false}, {"data": ["https://www.banglapuzzle.com/-17", 1, 0, 0.0, 1938.0, 1938, 1938, 1938.0, 1938.0, 1938.0, 1938.0, 0.5159958720330237, 31.712582236842106, 0.6308855779153767], "isController": false}, {"data": ["https://www.banglapuzzle.com/-18", 1, 0, 0.0, 272.0, 272, 272, 272.0, 272.0, 272.0, 272.0, 3.676470588235294, 9.683048023897058, 4.430434283088235], "isController": false}, {"data": ["https://www.banglapuzzle.com/-15", 1, 0, 0.0, 274.0, 274, 274, 274.0, 274.0, 274.0, 274.0, 3.6496350364963503, 10.029368156934305, 4.401659443430656], "isController": false}, {"data": ["https://www.banglapuzzle.com/-16", 1, 0, 0.0, 274.0, 274, 274, 274.0, 274.0, 274.0, 274.0, 3.6496350364963503, 11.60113480839416, 4.405223540145985], "isController": false}, {"data": ["https://www.banglapuzzle.com/-13", 1, 0, 0.0, 1628.0, 1628, 1628, 1628.0, 1628.0, 1628.0, 1628.0, 0.6142506142506142, 76.69674735104424, 0.7540166231572482], "isController": false}, {"data": ["https://www.banglapuzzle.com/-14", 1, 0, 0.0, 271.0, 271, 271, 271.0, 271.0, 271.0, 271.0, 3.6900369003690034, 25.048287592250922, 4.453989852398523], "isController": false}, {"data": ["https://www.banglapuzzle.com/-11", 1, 0, 0.0, 541.0, 541, 541, 541.0, 541.0, 541.0, 541.0, 1.8484288354898337, 27.897917629390015, 2.222085836414048], "isController": false}, {"data": ["https://www.banglapuzzle.com/products-8", 1, 0, 0.0, 268.0, 268, 268, 268.0, 268.0, 268.0, 268.0, 3.7313432835820897, 0.9219041511194029, 4.693330223880597], "isController": false}, {"data": ["https://www.banglapuzzle.com/-12", 1, 0, 0.0, 2435.0, 2435, 2435, 2435.0, 2435.0, 2435.0, 2435.0, 0.4106776180698152, 131.20067055954826, 0.5105396560574949], "isController": false}, {"data": ["https://www.banglapuzzle.com/products-9", 1, 0, 0.0, 358.0, 358, 358, 358.0, 358.0, 358.0, 358.0, 2.793296089385475, 592.7461592178771, 1.4402932960893855], "isController": false}, {"data": ["https://www.banglapuzzle.com/products-6", 1, 0, 0.0, 143.0, 143, 143, 143.0, 143.0, 143.0, 143.0, 6.993006993006993, 106.13117351398603, 4.438920454545455], "isController": false}, {"data": ["https://www.banglapuzzle.com/-10", 1, 0, 0.0, 1295.0, 1295, 1295, 1295.0, 1295.0, 1295.0, 1295.0, 0.7722007722007722, 72.1653293918919, 0.39590371621621623], "isController": false}, {"data": ["https://www.banglapuzzle.com/products-7", 1, 0, 0.0, 1024.0, 1024, 1024, 1024.0, 1024.0, 1024.0, 1024.0, 0.9765625, 0.24127960205078125, 1.2254714965820312], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 114, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
