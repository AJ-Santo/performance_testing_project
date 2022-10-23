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
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 1.0, "series": [{"data": [[200.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-20", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-21", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-22", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-17", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-18", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-19", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-13", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-14", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-15", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-16", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-10", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-11", "isController": false}, {"data": [[7400.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-12", "isController": false}, {"data": [[12600.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/", "isController": false}, {"data": [[9800.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products", "isController": false}, {"data": [[1900.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-53", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-51", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-52", "isController": false}, {"data": [[1800.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-50", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-10", "isController": false}, {"data": [[7300.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-11", "isController": false}, {"data": [[2200.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-12", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-13", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-14", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-15", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-16", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-17", "isController": false}, {"data": [[29800.0, 1.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-18", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-19", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-48", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-49", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-46", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-47", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-44", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-45", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-42", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-43", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-40", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-9", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-41", "isController": false}, {"data": [[5400.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-7", "isController": false}, {"data": [[1800.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-8", "isController": false}, {"data": [[0.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-1", "isController": false}, {"data": [[4300.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-2", "isController": false}, {"data": [[4600.0, 1.0], [1700.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-0", "isController": false}, {"data": [[1100.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-5", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-6", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-20", "isController": false}, {"data": [[900.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-3", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-21", "isController": false}, {"data": [[900.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-4", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-22", "isController": false}, {"data": [[1000.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-23", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-24", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-25", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-26", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-27", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-39", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-37", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-38", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-35", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-36", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-33", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-34", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-31", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-32", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-30", "isController": false}, {"data": [[1300.0, 1.0], [3600.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-0", "isController": false}, {"data": [[200.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-1", "isController": false}, {"data": [[2600.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-8", "isController": false}, {"data": [[1200.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-9", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-6", "isController": false}, {"data": [[2000.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-7", "isController": false}, {"data": [[1100.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-4", "isController": false}, {"data": [[1100.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-5", "isController": false}, {"data": [[300.0, 1.0], [5700.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-2", "isController": false}, {"data": [[1000.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-28", "isController": false}, {"data": [[1400.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-3", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-29", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-26", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-27", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-24", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-25", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-22", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-23", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-20", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-21", "isController": false}, {"data": [[1100.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-4", "isController": false}, {"data": [[1000.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-5", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-2", "isController": false}, {"data": [[1300.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-3", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-19", "isController": false}, {"data": [[1400.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-0", "isController": false}, {"data": [[900.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-1", "isController": false}, {"data": [[1900.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-17", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-18", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-15", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-16", "isController": false}, {"data": [[1600.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-13", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-14", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-11", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-8", "isController": false}, {"data": [[2400.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-12", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-9", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-6", "isController": false}, {"data": [[1200.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-10", "isController": false}, {"data": [[1000.0, 1.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-7", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 29800.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 19.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 53.0, "series": [{"data": [[0.0, 53.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 42.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 19.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.66650282E12, "maxY": 1.0, "series": [{"data": [[1.66650282E12, 0.0], [1.66650288E12, 0.0]], "isOverall": false, "label": "", "isController": false}, {"data": [[1.66650282E12, 0.0], [1.66650288E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-9", "isController": false}, {"data": [[1.66650282E12, 1.0], [1.66650288E12, 1.0]], "isOverall": false, "label": "Thread Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66650288E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 24.0, "minX": 0.0, "maxY": 29831.0, "series": [{"data": [[1.0, 273.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-20", "isController": false}, {"data": [[1.0, 273.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-20-Aggregated", "isController": false}, {"data": [[1.0, 81.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-21", "isController": false}, {"data": [[1.0, 81.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-21-Aggregated", "isController": false}, {"data": [[1.0, 25.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-22", "isController": false}, {"data": [[1.0, 25.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-22-Aggregated", "isController": false}, {"data": [[1.0, 269.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-17", "isController": false}, {"data": [[1.0, 269.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-17-Aggregated", "isController": false}, {"data": [[1.0, 270.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-18", "isController": false}, {"data": [[1.0, 270.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-18-Aggregated", "isController": false}, {"data": [[1.0, 269.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-19", "isController": false}, {"data": [[1.0, 269.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-19-Aggregated", "isController": false}, {"data": [[1.0, 319.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-13", "isController": false}, {"data": [[1.0, 319.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-13-Aggregated", "isController": false}, {"data": [[1.0, 272.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-14", "isController": false}, {"data": [[1.0, 272.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-14-Aggregated", "isController": false}, {"data": [[1.0, 273.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-15", "isController": false}, {"data": [[1.0, 273.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-15-Aggregated", "isController": false}, {"data": [[1.0, 271.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-16", "isController": false}, {"data": [[1.0, 271.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-16-Aggregated", "isController": false}, {"data": [[1.0, 119.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-10", "isController": false}, {"data": [[1.0, 119.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-10-Aggregated", "isController": false}, {"data": [[1.0, 269.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-11", "isController": false}, {"data": [[1.0, 269.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-11-Aggregated", "isController": false}, {"data": [[1.0, 7454.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-12", "isController": false}, {"data": [[1.0, 7454.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-12-Aggregated", "isController": false}, {"data": [[1.0, 12600.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/", "isController": false}, {"data": [[1.0, 12600.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-Aggregated", "isController": false}, {"data": [[1.0, 9895.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products", "isController": false}, {"data": [[1.0, 9895.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-Aggregated", "isController": false}, {"data": [[1.0, 1967.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-53", "isController": false}, {"data": [[1.0, 1967.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-53-Aggregated", "isController": false}, {"data": [[1.0, 271.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-51", "isController": false}, {"data": [[1.0, 271.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-51-Aggregated", "isController": false}, {"data": [[1.0, 829.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-52", "isController": false}, {"data": [[1.0, 829.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-52-Aggregated", "isController": false}, {"data": [[1.0, 1869.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-50", "isController": false}, {"data": [[1.0, 1869.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-50-Aggregated", "isController": false}, {"data": [[1.0, 119.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-10", "isController": false}, {"data": [[1.0, 119.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-10-Aggregated", "isController": false}, {"data": [[1.0, 7335.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news", "isController": false}, {"data": [[1.0, 7335.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-Aggregated", "isController": false}, {"data": [[1.0, 541.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-11", "isController": false}, {"data": [[1.0, 541.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-11-Aggregated", "isController": false}, {"data": [[1.0, 2220.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-12", "isController": false}, {"data": [[1.0, 2220.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-12-Aggregated", "isController": false}, {"data": [[1.0, 552.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-13", "isController": false}, {"data": [[1.0, 552.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-13-Aggregated", "isController": false}, {"data": [[1.0, 274.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-14", "isController": false}, {"data": [[1.0, 274.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-14-Aggregated", "isController": false}, {"data": [[1.0, 545.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-15", "isController": false}, {"data": [[1.0, 545.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-15-Aggregated", "isController": false}, {"data": [[1.0, 542.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-16", "isController": false}, {"data": [[1.0, 542.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-16-Aggregated", "isController": false}, {"data": [[1.0, 269.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-17", "isController": false}, {"data": [[1.0, 269.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-17-Aggregated", "isController": false}, {"data": [[1.0, 29831.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.0, 29831.0]], "isOverall": false, "label": "Test-Aggregated", "isController": true}, {"data": [[1.0, 270.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-18", "isController": false}, {"data": [[1.0, 270.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-18-Aggregated", "isController": false}, {"data": [[1.0, 269.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-19", "isController": false}, {"data": [[1.0, 269.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-19-Aggregated", "isController": false}, {"data": [[1.0, 270.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-48", "isController": false}, {"data": [[1.0, 270.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-48-Aggregated", "isController": false}, {"data": [[1.0, 821.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-49", "isController": false}, {"data": [[1.0, 821.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-49-Aggregated", "isController": false}, {"data": [[1.0, 550.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-46", "isController": false}, {"data": [[1.0, 550.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-46-Aggregated", "isController": false}, {"data": [[1.0, 180.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-47", "isController": false}, {"data": [[1.0, 180.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-47-Aggregated", "isController": false}, {"data": [[1.0, 533.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-44", "isController": false}, {"data": [[1.0, 533.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-44-Aggregated", "isController": false}, {"data": [[1.0, 544.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-45", "isController": false}, {"data": [[1.0, 544.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-45-Aggregated", "isController": false}, {"data": [[1.0, 278.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-42", "isController": false}, {"data": [[1.0, 278.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-42-Aggregated", "isController": false}, {"data": [[1.0, 542.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-43", "isController": false}, {"data": [[1.0, 542.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-43-Aggregated", "isController": false}, {"data": [[1.0, 277.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-40", "isController": false}, {"data": [[1.0, 277.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-40-Aggregated", "isController": false}, {"data": [[1.0, 405.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-9", "isController": false}, {"data": [[1.0, 405.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-9-Aggregated", "isController": false}, {"data": [[1.0, 275.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-41", "isController": false}, {"data": [[1.0, 275.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-41-Aggregated", "isController": false}, {"data": [[1.0, 5471.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-7", "isController": false}, {"data": [[1.0, 5471.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-7-Aggregated", "isController": false}, {"data": [[1.0, 1874.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-8", "isController": false}, {"data": [[1.0, 1874.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-8-Aggregated", "isController": false}, {"data": [[1.0, 271.0], [0.0, 33.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-1", "isController": false}, {"data": [[0.5, 152.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-1-Aggregated", "isController": false}, {"data": [[1.0, 4393.0], [0.0, 809.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-2", "isController": false}, {"data": [[0.5, 2601.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-2-Aggregated", "isController": false}, {"data": [[1.0, 1711.0], [0.0, 4660.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-0", "isController": false}, {"data": [[0.5, 3185.5]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-0-Aggregated", "isController": false}, {"data": [[1.0, 1133.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-5", "isController": false}, {"data": [[1.0, 1133.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-5-Aggregated", "isController": false}, {"data": [[1.0, 141.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-6", "isController": false}, {"data": [[1.0, 141.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-6-Aggregated", "isController": false}, {"data": [[1.0, 270.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-20", "isController": false}, {"data": [[1.0, 270.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-20-Aggregated", "isController": false}, {"data": [[1.0, 960.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-3", "isController": false}, {"data": [[1.0, 960.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-3-Aggregated", "isController": false}, {"data": [[1.0, 272.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-21", "isController": false}, {"data": [[1.0, 272.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-21-Aggregated", "isController": false}, {"data": [[1.0, 980.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-4", "isController": false}, {"data": [[1.0, 980.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-4-Aggregated", "isController": false}, {"data": [[1.0, 272.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-22", "isController": false}, {"data": [[1.0, 272.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-22-Aggregated", "isController": false}, {"data": [[1.0, 1082.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-23", "isController": false}, {"data": [[1.0, 1082.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-23-Aggregated", "isController": false}, {"data": [[1.0, 810.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-24", "isController": false}, {"data": [[1.0, 810.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-24-Aggregated", "isController": false}, {"data": [[1.0, 273.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-25", "isController": false}, {"data": [[1.0, 273.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-25-Aggregated", "isController": false}, {"data": [[1.0, 78.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-26", "isController": false}, {"data": [[1.0, 78.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-26-Aggregated", "isController": false}, {"data": [[1.0, 24.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-27", "isController": false}, {"data": [[1.0, 24.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-27-Aggregated", "isController": false}, {"data": [[1.0, 539.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-39", "isController": false}, {"data": [[1.0, 539.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-39-Aggregated", "isController": false}, {"data": [[1.0, 277.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-37", "isController": false}, {"data": [[1.0, 277.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-37-Aggregated", "isController": false}, {"data": [[1.0, 273.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-38", "isController": false}, {"data": [[1.0, 273.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-38-Aggregated", "isController": false}, {"data": [[1.0, 271.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-35", "isController": false}, {"data": [[1.0, 271.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-35-Aggregated", "isController": false}, {"data": [[1.0, 272.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-36", "isController": false}, {"data": [[1.0, 272.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-36-Aggregated", "isController": false}, {"data": [[1.0, 552.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-33", "isController": false}, {"data": [[1.0, 552.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-33-Aggregated", "isController": false}, {"data": [[1.0, 277.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-34", "isController": false}, {"data": [[1.0, 277.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-34-Aggregated", "isController": false}, {"data": [[1.0, 276.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-31", "isController": false}, {"data": [[1.0, 276.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-31-Aggregated", "isController": false}, {"data": [[1.0, 275.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-32", "isController": false}, {"data": [[1.0, 275.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-32-Aggregated", "isController": false}, {"data": [[1.0, 271.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-30", "isController": false}, {"data": [[1.0, 271.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-30-Aggregated", "isController": false}, {"data": [[1.0, 3665.0], [0.0, 1367.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-0", "isController": false}, {"data": [[0.5, 2516.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-0-Aggregated", "isController": false}, {"data": [[1.0, 299.0], [0.0, 485.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-1", "isController": false}, {"data": [[0.5, 392.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-1-Aggregated", "isController": false}, {"data": [[1.0, 2647.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-8", "isController": false}, {"data": [[1.0, 2647.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-8-Aggregated", "isController": false}, {"data": [[1.0, 1254.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-9", "isController": false}, {"data": [[1.0, 1254.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-9-Aggregated", "isController": false}, {"data": [[1.0, 621.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-6", "isController": false}, {"data": [[1.0, 621.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-6-Aggregated", "isController": false}, {"data": [[1.0, 2028.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-7", "isController": false}, {"data": [[1.0, 2028.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-7-Aggregated", "isController": false}, {"data": [[1.0, 1125.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-4", "isController": false}, {"data": [[1.0, 1125.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-4-Aggregated", "isController": false}, {"data": [[1.0, 1101.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-5", "isController": false}, {"data": [[1.0, 1101.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-5-Aggregated", "isController": false}, {"data": [[1.0, 5723.0], [0.0, 308.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-2", "isController": false}, {"data": [[0.5, 3015.5]], "isOverall": false, "label": "https://www.banglapuzzle.com/-2-Aggregated", "isController": false}, {"data": [[1.0, 1082.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-28", "isController": false}, {"data": [[1.0, 1082.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-28-Aggregated", "isController": false}, {"data": [[1.0, 1481.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-3", "isController": false}, {"data": [[1.0, 1481.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-3-Aggregated", "isController": false}, {"data": [[1.0, 539.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-29", "isController": false}, {"data": [[1.0, 539.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-29-Aggregated", "isController": false}, {"data": [[1.0, 550.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-26", "isController": false}, {"data": [[1.0, 550.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-26-Aggregated", "isController": false}, {"data": [[1.0, 546.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-27", "isController": false}, {"data": [[1.0, 546.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-27-Aggregated", "isController": false}, {"data": [[1.0, 546.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-24", "isController": false}, {"data": [[1.0, 546.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-24-Aggregated", "isController": false}, {"data": [[1.0, 275.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-25", "isController": false}, {"data": [[1.0, 275.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-25-Aggregated", "isController": false}, {"data": [[1.0, 553.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-22", "isController": false}, {"data": [[1.0, 553.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-22-Aggregated", "isController": false}, {"data": [[1.0, 805.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-23", "isController": false}, {"data": [[1.0, 805.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-23-Aggregated", "isController": false}, {"data": [[1.0, 538.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-20", "isController": false}, {"data": [[1.0, 538.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-20-Aggregated", "isController": false}, {"data": [[1.0, 539.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-21", "isController": false}, {"data": [[1.0, 539.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-21-Aggregated", "isController": false}, {"data": [[1.0, 1154.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-4", "isController": false}, {"data": [[1.0, 1154.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-4-Aggregated", "isController": false}, {"data": [[1.0, 1078.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-5", "isController": false}, {"data": [[1.0, 1078.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-5-Aggregated", "isController": false}, {"data": [[1.0, 269.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-2", "isController": false}, {"data": [[1.0, 269.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-2-Aggregated", "isController": false}, {"data": [[1.0, 1305.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-3", "isController": false}, {"data": [[1.0, 1305.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-3-Aggregated", "isController": false}, {"data": [[1.0, 591.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-19", "isController": false}, {"data": [[1.0, 591.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-19-Aggregated", "isController": false}, {"data": [[1.0, 1409.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-0", "isController": false}, {"data": [[1.0, 1409.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-0-Aggregated", "isController": false}, {"data": [[1.0, 955.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-1", "isController": false}, {"data": [[1.0, 955.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-1-Aggregated", "isController": false}, {"data": [[1.0, 1938.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-17", "isController": false}, {"data": [[1.0, 1938.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-17-Aggregated", "isController": false}, {"data": [[1.0, 272.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-18", "isController": false}, {"data": [[1.0, 272.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-18-Aggregated", "isController": false}, {"data": [[1.0, 274.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-15", "isController": false}, {"data": [[1.0, 274.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-15-Aggregated", "isController": false}, {"data": [[1.0, 274.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-16", "isController": false}, {"data": [[1.0, 274.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-16-Aggregated", "isController": false}, {"data": [[1.0, 1628.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-13", "isController": false}, {"data": [[1.0, 1628.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-13-Aggregated", "isController": false}, {"data": [[1.0, 271.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-14", "isController": false}, {"data": [[1.0, 271.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-14-Aggregated", "isController": false}, {"data": [[1.0, 541.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-11", "isController": false}, {"data": [[1.0, 541.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-11-Aggregated", "isController": false}, {"data": [[1.0, 268.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-8", "isController": false}, {"data": [[1.0, 268.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-8-Aggregated", "isController": false}, {"data": [[1.0, 2435.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-12", "isController": false}, {"data": [[1.0, 2435.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-12-Aggregated", "isController": false}, {"data": [[1.0, 358.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-9", "isController": false}, {"data": [[1.0, 358.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-9-Aggregated", "isController": false}, {"data": [[1.0, 143.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-6", "isController": false}, {"data": [[1.0, 143.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-6-Aggregated", "isController": false}, {"data": [[1.0, 1295.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-10", "isController": false}, {"data": [[1.0, 1295.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-10-Aggregated", "isController": false}, {"data": [[1.0, 1024.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-7", "isController": false}, {"data": [[1.0, 1024.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-7-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 1.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 2052.6666666666665, "minX": 1.66650282E12, "maxY": 106063.6, "series": [{"data": [[1.66650282E12, 73515.26666666666], [1.66650288E12, 106063.6]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.66650282E12, 2184.7], [1.66650288E12, 2052.6666666666665]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66650288E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 24.0, "minX": 1.66650282E12, "maxY": 29831.0, "series": [{"data": [[1.66650288E12, 273.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-20", "isController": false}, {"data": [[1.66650288E12, 81.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-21", "isController": false}, {"data": [[1.66650288E12, 25.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-22", "isController": false}, {"data": [[1.66650288E12, 269.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-17", "isController": false}, {"data": [[1.66650288E12, 270.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-18", "isController": false}, {"data": [[1.66650288E12, 269.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-19", "isController": false}, {"data": [[1.66650288E12, 319.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-13", "isController": false}, {"data": [[1.66650288E12, 272.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-14", "isController": false}, {"data": [[1.66650288E12, 273.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-15", "isController": false}, {"data": [[1.66650288E12, 271.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-16", "isController": false}, {"data": [[1.66650288E12, 119.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-10", "isController": false}, {"data": [[1.66650288E12, 269.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-11", "isController": false}, {"data": [[1.66650288E12, 7454.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-12", "isController": false}, {"data": [[1.66650282E12, 12600.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/", "isController": false}, {"data": [[1.66650288E12, 9895.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products", "isController": false}, {"data": [[1.66650282E12, 1967.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-53", "isController": false}, {"data": [[1.66650282E12, 271.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-51", "isController": false}, {"data": [[1.66650282E12, 829.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-52", "isController": false}, {"data": [[1.66650282E12, 1869.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-50", "isController": false}, {"data": [[1.66650288E12, 119.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-10", "isController": false}, {"data": [[1.66650288E12, 7335.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news", "isController": false}, {"data": [[1.66650288E12, 541.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-11", "isController": false}, {"data": [[1.66650288E12, 2220.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-12", "isController": false}, {"data": [[1.66650288E12, 552.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-13", "isController": false}, {"data": [[1.66650288E12, 274.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-14", "isController": false}, {"data": [[1.66650288E12, 545.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-15", "isController": false}, {"data": [[1.66650288E12, 542.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-16", "isController": false}, {"data": [[1.66650288E12, 269.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-17", "isController": false}, {"data": [[1.66650288E12, 29831.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.66650288E12, 270.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-18", "isController": false}, {"data": [[1.66650288E12, 269.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-19", "isController": false}, {"data": [[1.66650282E12, 270.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-48", "isController": false}, {"data": [[1.66650282E12, 821.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-49", "isController": false}, {"data": [[1.66650282E12, 550.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-46", "isController": false}, {"data": [[1.66650282E12, 180.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-47", "isController": false}, {"data": [[1.66650282E12, 533.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-44", "isController": false}, {"data": [[1.66650282E12, 544.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-45", "isController": false}, {"data": [[1.66650282E12, 278.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-42", "isController": false}, {"data": [[1.66650282E12, 542.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-43", "isController": false}, {"data": [[1.66650282E12, 277.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-40", "isController": false}, {"data": [[1.66650288E12, 405.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-9", "isController": false}, {"data": [[1.66650282E12, 275.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-41", "isController": false}, {"data": [[1.66650288E12, 5471.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-7", "isController": false}, {"data": [[1.66650288E12, 1874.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-8", "isController": false}, {"data": [[1.66650288E12, 152.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-1", "isController": false}, {"data": [[1.66650288E12, 2601.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-2", "isController": false}, {"data": [[1.66650288E12, 3185.5]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-0", "isController": false}, {"data": [[1.66650288E12, 1133.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-5", "isController": false}, {"data": [[1.66650288E12, 141.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-6", "isController": false}, {"data": [[1.66650288E12, 270.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-20", "isController": false}, {"data": [[1.66650288E12, 960.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-3", "isController": false}, {"data": [[1.66650288E12, 272.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-21", "isController": false}, {"data": [[1.66650288E12, 980.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-4", "isController": false}, {"data": [[1.66650288E12, 272.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-22", "isController": false}, {"data": [[1.66650288E12, 1082.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-23", "isController": false}, {"data": [[1.66650288E12, 810.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-24", "isController": false}, {"data": [[1.66650288E12, 273.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-25", "isController": false}, {"data": [[1.66650288E12, 78.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-26", "isController": false}, {"data": [[1.66650288E12, 24.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-27", "isController": false}, {"data": [[1.66650282E12, 539.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-39", "isController": false}, {"data": [[1.66650282E12, 277.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-37", "isController": false}, {"data": [[1.66650282E12, 273.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-38", "isController": false}, {"data": [[1.66650282E12, 271.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-35", "isController": false}, {"data": [[1.66650282E12, 272.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-36", "isController": false}, {"data": [[1.66650282E12, 552.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-33", "isController": false}, {"data": [[1.66650282E12, 277.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-34", "isController": false}, {"data": [[1.66650282E12, 276.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-31", "isController": false}, {"data": [[1.66650282E12, 275.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-32", "isController": false}, {"data": [[1.66650282E12, 271.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-30", "isController": false}, {"data": [[1.66650282E12, 2516.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-0", "isController": false}, {"data": [[1.66650282E12, 392.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-1", "isController": false}, {"data": [[1.66650282E12, 2647.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-8", "isController": false}, {"data": [[1.66650282E12, 1254.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-9", "isController": false}, {"data": [[1.66650282E12, 621.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-6", "isController": false}, {"data": [[1.66650282E12, 2028.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-7", "isController": false}, {"data": [[1.66650282E12, 1125.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-4", "isController": false}, {"data": [[1.66650282E12, 1101.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-5", "isController": false}, {"data": [[1.66650282E12, 3015.5]], "isOverall": false, "label": "https://www.banglapuzzle.com/-2", "isController": false}, {"data": [[1.66650282E12, 1082.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-28", "isController": false}, {"data": [[1.66650282E12, 1481.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-3", "isController": false}, {"data": [[1.66650282E12, 539.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-29", "isController": false}, {"data": [[1.66650282E12, 550.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-26", "isController": false}, {"data": [[1.66650282E12, 546.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-27", "isController": false}, {"data": [[1.66650282E12, 546.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-24", "isController": false}, {"data": [[1.66650282E12, 275.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-25", "isController": false}, {"data": [[1.66650282E12, 553.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-22", "isController": false}, {"data": [[1.66650282E12, 805.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-23", "isController": false}, {"data": [[1.66650282E12, 538.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-20", "isController": false}, {"data": [[1.66650282E12, 539.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-21", "isController": false}, {"data": [[1.66650288E12, 1154.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-4", "isController": false}, {"data": [[1.66650288E12, 1078.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-5", "isController": false}, {"data": [[1.66650288E12, 269.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-2", "isController": false}, {"data": [[1.66650288E12, 1305.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-3", "isController": false}, {"data": [[1.66650282E12, 591.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-19", "isController": false}, {"data": [[1.66650288E12, 1409.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-0", "isController": false}, {"data": [[1.66650288E12, 955.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-1", "isController": false}, {"data": [[1.66650282E12, 1938.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-17", "isController": false}, {"data": [[1.66650282E12, 272.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-18", "isController": false}, {"data": [[1.66650282E12, 274.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-15", "isController": false}, {"data": [[1.66650282E12, 274.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-16", "isController": false}, {"data": [[1.66650282E12, 1628.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-13", "isController": false}, {"data": [[1.66650282E12, 271.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-14", "isController": false}, {"data": [[1.66650282E12, 541.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-11", "isController": false}, {"data": [[1.66650288E12, 268.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-8", "isController": false}, {"data": [[1.66650282E12, 2435.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-12", "isController": false}, {"data": [[1.66650288E12, 358.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-9", "isController": false}, {"data": [[1.66650288E12, 143.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-6", "isController": false}, {"data": [[1.66650282E12, 1295.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-10", "isController": false}, {"data": [[1.66650288E12, 1024.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-7", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66650288E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.66650282E12, "maxY": 4668.0, "series": [{"data": [[1.66650288E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-20", "isController": false}, {"data": [[1.66650288E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-21", "isController": false}, {"data": [[1.66650288E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-22", "isController": false}, {"data": [[1.66650288E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-17", "isController": false}, {"data": [[1.66650288E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-18", "isController": false}, {"data": [[1.66650288E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-19", "isController": false}, {"data": [[1.66650288E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-13", "isController": false}, {"data": [[1.66650288E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-14", "isController": false}, {"data": [[1.66650288E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-15", "isController": false}, {"data": [[1.66650288E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-16", "isController": false}, {"data": [[1.66650288E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-10", "isController": false}, {"data": [[1.66650288E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-11", "isController": false}, {"data": [[1.66650288E12, 546.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-12", "isController": false}, {"data": [[1.66650282E12, 2811.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/", "isController": false}, {"data": [[1.66650288E12, 611.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products", "isController": false}, {"data": [[1.66650282E12, 1967.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-53", "isController": false}, {"data": [[1.66650282E12, 271.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-51", "isController": false}, {"data": [[1.66650282E12, 610.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-52", "isController": false}, {"data": [[1.66650282E12, 805.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-50", "isController": false}, {"data": [[1.66650288E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-10", "isController": false}, {"data": [[1.66650288E12, 1246.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news", "isController": false}, {"data": [[1.66650288E12, 541.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-11", "isController": false}, {"data": [[1.66650288E12, 562.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-12", "isController": false}, {"data": [[1.66650288E12, 552.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-13", "isController": false}, {"data": [[1.66650288E12, 274.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-14", "isController": false}, {"data": [[1.66650288E12, 544.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-15", "isController": false}, {"data": [[1.66650288E12, 542.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-16", "isController": false}, {"data": [[1.66650288E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-17", "isController": false}, {"data": [[1.66650288E12, 4668.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.66650288E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-18", "isController": false}, {"data": [[1.66650288E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-19", "isController": false}, {"data": [[1.66650282E12, 270.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-48", "isController": false}, {"data": [[1.66650282E12, 279.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-49", "isController": false}, {"data": [[1.66650282E12, 547.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-46", "isController": false}, {"data": [[1.66650282E12, 180.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-47", "isController": false}, {"data": [[1.66650282E12, 533.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-44", "isController": false}, {"data": [[1.66650282E12, 543.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-45", "isController": false}, {"data": [[1.66650282E12, 278.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-42", "isController": false}, {"data": [[1.66650282E12, 542.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-43", "isController": false}, {"data": [[1.66650282E12, 277.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-40", "isController": false}, {"data": [[1.66650288E12, 145.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-9", "isController": false}, {"data": [[1.66650282E12, 275.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-41", "isController": false}, {"data": [[1.66650288E12, 2752.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-7", "isController": false}, {"data": [[1.66650288E12, 540.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-8", "isController": false}, {"data": [[1.66650288E12, 135.5]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-1", "isController": false}, {"data": [[1.66650288E12, 952.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-2", "isController": false}, {"data": [[1.66650288E12, 1999.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-0", "isController": false}, {"data": [[1.66650288E12, 1133.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-5", "isController": false}, {"data": [[1.66650288E12, 128.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-6", "isController": false}, {"data": [[1.66650288E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-20", "isController": false}, {"data": [[1.66650288E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-3", "isController": false}, {"data": [[1.66650288E12, 272.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-21", "isController": false}, {"data": [[1.66650288E12, 980.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-4", "isController": false}, {"data": [[1.66650288E12, 272.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-22", "isController": false}, {"data": [[1.66650288E12, 545.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-23", "isController": false}, {"data": [[1.66650288E12, 276.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-24", "isController": false}, {"data": [[1.66650288E12, 273.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-25", "isController": false}, {"data": [[1.66650288E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-26", "isController": false}, {"data": [[1.66650288E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-27", "isController": false}, {"data": [[1.66650282E12, 539.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-39", "isController": false}, {"data": [[1.66650282E12, 277.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-37", "isController": false}, {"data": [[1.66650282E12, 273.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-38", "isController": false}, {"data": [[1.66650282E12, 271.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-35", "isController": false}, {"data": [[1.66650282E12, 272.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-36", "isController": false}, {"data": [[1.66650282E12, 551.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-33", "isController": false}, {"data": [[1.66650282E12, 277.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-34", "isController": false}, {"data": [[1.66650282E12, 276.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-31", "isController": false}, {"data": [[1.66650282E12, 275.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-32", "isController": false}, {"data": [[1.66650282E12, 271.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-30", "isController": false}, {"data": [[1.66650282E12, 1681.5]], "isOverall": false, "label": "https://www.banglapuzzle.com/-0", "isController": false}, {"data": [[1.66650282E12, 263.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-1", "isController": false}, {"data": [[1.66650282E12, 1583.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-8", "isController": false}, {"data": [[1.66650282E12, 659.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-9", "isController": false}, {"data": [[1.66650282E12, 614.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-6", "isController": false}, {"data": [[1.66650282E12, 552.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-7", "isController": false}, {"data": [[1.66650282E12, 1125.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-4", "isController": false}, {"data": [[1.66650282E12, 1101.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-5", "isController": false}, {"data": [[1.66650282E12, 935.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-2", "isController": false}, {"data": [[1.66650282E12, 813.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-28", "isController": false}, {"data": [[1.66650282E12, 1213.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-3", "isController": false}, {"data": [[1.66650282E12, 538.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-29", "isController": false}, {"data": [[1.66650282E12, 280.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-26", "isController": false}, {"data": [[1.66650282E12, 546.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-27", "isController": false}, {"data": [[1.66650282E12, 545.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-24", "isController": false}, {"data": [[1.66650282E12, 275.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-25", "isController": false}, {"data": [[1.66650282E12, 552.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-22", "isController": false}, {"data": [[1.66650282E12, 805.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-23", "isController": false}, {"data": [[1.66650282E12, 538.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-20", "isController": false}, {"data": [[1.66650282E12, 539.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-21", "isController": false}, {"data": [[1.66650288E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-4", "isController": false}, {"data": [[1.66650288E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-5", "isController": false}, {"data": [[1.66650288E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-2", "isController": false}, {"data": [[1.66650288E12, 1299.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-3", "isController": false}, {"data": [[1.66650282E12, 591.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-19", "isController": false}, {"data": [[1.66650288E12, 611.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-0", "isController": false}, {"data": [[1.66650288E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-1", "isController": false}, {"data": [[1.66650282E12, 865.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-17", "isController": false}, {"data": [[1.66650282E12, 272.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-18", "isController": false}, {"data": [[1.66650282E12, 274.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-15", "isController": false}, {"data": [[1.66650282E12, 274.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-16", "isController": false}, {"data": [[1.66650282E12, 547.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-13", "isController": false}, {"data": [[1.66650282E12, 271.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-14", "isController": false}, {"data": [[1.66650282E12, 541.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-11", "isController": false}, {"data": [[1.66650288E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-8", "isController": false}, {"data": [[1.66650282E12, 554.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-12", "isController": false}, {"data": [[1.66650288E12, 143.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-9", "isController": false}, {"data": [[1.66650288E12, 129.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-6", "isController": false}, {"data": [[1.66650282E12, 676.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-10", "isController": false}, {"data": [[1.66650288E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-7", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66650288E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.66650282E12, "maxY": 2737.0, "series": [{"data": [[1.66650288E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-20", "isController": false}, {"data": [[1.66650288E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-21", "isController": false}, {"data": [[1.66650288E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-22", "isController": false}, {"data": [[1.66650288E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-17", "isController": false}, {"data": [[1.66650288E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-18", "isController": false}, {"data": [[1.66650288E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-19", "isController": false}, {"data": [[1.66650288E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-13", "isController": false}, {"data": [[1.66650288E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-14", "isController": false}, {"data": [[1.66650288E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-15", "isController": false}, {"data": [[1.66650288E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-16", "isController": false}, {"data": [[1.66650288E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-10", "isController": false}, {"data": [[1.66650288E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-11", "isController": false}, {"data": [[1.66650288E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-12", "isController": false}, {"data": [[1.66650282E12, 2101.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/", "isController": false}, {"data": [[1.66650288E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products", "isController": false}, {"data": [[1.66650282E12, 1404.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-53", "isController": false}, {"data": [[1.66650282E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-51", "isController": false}, {"data": [[1.66650282E12, 330.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-52", "isController": false}, {"data": [[1.66650282E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-50", "isController": false}, {"data": [[1.66650288E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-10", "isController": false}, {"data": [[1.66650288E12, 636.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news", "isController": false}, {"data": [[1.66650288E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-11", "isController": false}, {"data": [[1.66650288E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-12", "isController": false}, {"data": [[1.66650288E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-13", "isController": false}, {"data": [[1.66650288E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-14", "isController": false}, {"data": [[1.66650288E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-15", "isController": false}, {"data": [[1.66650288E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-16", "isController": false}, {"data": [[1.66650288E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-17", "isController": false}, {"data": [[1.66650288E12, 2737.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.66650288E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-18", "isController": false}, {"data": [[1.66650288E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-19", "isController": false}, {"data": [[1.66650282E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-48", "isController": false}, {"data": [[1.66650282E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-49", "isController": false}, {"data": [[1.66650282E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-46", "isController": false}, {"data": [[1.66650282E12, 158.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-47", "isController": false}, {"data": [[1.66650282E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-44", "isController": false}, {"data": [[1.66650282E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-45", "isController": false}, {"data": [[1.66650282E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-42", "isController": false}, {"data": [[1.66650282E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-43", "isController": false}, {"data": [[1.66650282E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-40", "isController": false}, {"data": [[1.66650288E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-9", "isController": false}, {"data": [[1.66650282E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-41", "isController": false}, {"data": [[1.66650288E12, 775.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-7", "isController": false}, {"data": [[1.66650288E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-8", "isController": false}, {"data": [[1.66650288E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-1", "isController": false}, {"data": [[1.66650288E12, 400.5]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-2", "isController": false}, {"data": [[1.66650288E12, 705.5]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-0", "isController": false}, {"data": [[1.66650288E12, 850.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-5", "isController": false}, {"data": [[1.66650288E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-6", "isController": false}, {"data": [[1.66650288E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-20", "isController": false}, {"data": [[1.66650288E12, 686.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-3", "isController": false}, {"data": [[1.66650288E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-21", "isController": false}, {"data": [[1.66650288E12, 704.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-4", "isController": false}, {"data": [[1.66650288E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-22", "isController": false}, {"data": [[1.66650288E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-23", "isController": false}, {"data": [[1.66650288E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-24", "isController": false}, {"data": [[1.66650288E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-25", "isController": false}, {"data": [[1.66650288E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-26", "isController": false}, {"data": [[1.66650288E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-27", "isController": false}, {"data": [[1.66650282E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-39", "isController": false}, {"data": [[1.66650282E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-37", "isController": false}, {"data": [[1.66650282E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-38", "isController": false}, {"data": [[1.66650282E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-35", "isController": false}, {"data": [[1.66650282E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-36", "isController": false}, {"data": [[1.66650282E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-33", "isController": false}, {"data": [[1.66650282E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-34", "isController": false}, {"data": [[1.66650282E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-31", "isController": false}, {"data": [[1.66650282E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-32", "isController": false}, {"data": [[1.66650282E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-30", "isController": false}, {"data": [[1.66650282E12, 1050.5]], "isOverall": false, "label": "https://www.banglapuzzle.com/-0", "isController": false}, {"data": [[1.66650282E12, 84.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-1", "isController": false}, {"data": [[1.66650282E12, 770.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-8", "isController": false}, {"data": [[1.66650282E12, 531.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-9", "isController": false}, {"data": [[1.66650282E12, 489.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-6", "isController": false}, {"data": [[1.66650282E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-7", "isController": false}, {"data": [[1.66650282E12, 849.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-4", "isController": false}, {"data": [[1.66650282E12, 830.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-5", "isController": false}, {"data": [[1.66650282E12, 636.5]], "isOverall": false, "label": "https://www.banglapuzzle.com/-2", "isController": false}, {"data": [[1.66650282E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-28", "isController": false}, {"data": [[1.66650282E12, 668.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-3", "isController": false}, {"data": [[1.66650282E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-29", "isController": false}, {"data": [[1.66650282E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-26", "isController": false}, {"data": [[1.66650282E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-27", "isController": false}, {"data": [[1.66650282E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-24", "isController": false}, {"data": [[1.66650282E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-25", "isController": false}, {"data": [[1.66650282E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-22", "isController": false}, {"data": [[1.66650282E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-23", "isController": false}, {"data": [[1.66650282E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-20", "isController": false}, {"data": [[1.66650282E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-21", "isController": false}, {"data": [[1.66650288E12, 879.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-4", "isController": false}, {"data": [[1.66650288E12, 807.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-5", "isController": false}, {"data": [[1.66650288E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-2", "isController": false}, {"data": [[1.66650288E12, 762.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-3", "isController": false}, {"data": [[1.66650282E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-19", "isController": false}, {"data": [[1.66650288E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-0", "isController": false}, {"data": [[1.66650288E12, 684.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-1", "isController": false}, {"data": [[1.66650282E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-17", "isController": false}, {"data": [[1.66650282E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-18", "isController": false}, {"data": [[1.66650282E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-15", "isController": false}, {"data": [[1.66650282E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-16", "isController": false}, {"data": [[1.66650282E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-13", "isController": false}, {"data": [[1.66650282E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-14", "isController": false}, {"data": [[1.66650282E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-11", "isController": false}, {"data": [[1.66650288E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-8", "isController": false}, {"data": [[1.66650282E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-12", "isController": false}, {"data": [[1.66650288E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-9", "isController": false}, {"data": [[1.66650288E12, 0.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-6", "isController": false}, {"data": [[1.66650282E12, 550.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/-10", "isController": false}, {"data": [[1.66650288E12, 754.0]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-7", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66650288E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 24.0, "minX": 1.66650282E12, "maxY": 12600.0, "series": [{"data": [[1.66650282E12, 12600.0], [1.66650288E12, 9895.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.66650282E12, 2068.7000000000007], [1.66650288E12, 4473.100000000001]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.66650282E12, 12600.0], [1.66650288E12, 9895.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.66650282E12, 3767.899999999994], [1.66650288E12, 7352.849999999999]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.66650282E12, 180.0], [1.66650288E12, 24.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.66650282E12, 543.0], [1.66650288E12, 296.5]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66650288E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 268.5, "minX": 1.0, "maxY": 2537.0, "series": [{"data": [[1.0, 2537.0], [2.0, 825.0], [4.0, 1040.5], [8.0, 513.0], [9.0, 272.0], [5.0, 546.5], [3.0, 1918.0], [12.0, 408.0], [6.0, 268.5], [7.0, 553.0], [15.0, 276.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 15.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 0.0, "minX": 1.0, "maxY": 1711.0, "series": [{"data": [[1.0, 1711.0], [2.0, 578.0], [4.0, 785.5], [8.0, 407.5], [9.0, 272.0], [5.0, 408.0], [3.0, 1246.0], [12.0, 278.5], [6.0, 0.0], [7.0, 547.0], [15.0, 225.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 15.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 0.9, "minX": 1.66650282E12, "maxY": 1.0, "series": [{"data": [[1.66650282E12, 1.0], [1.66650288E12, 0.9]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66650288E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.66650282E12, "maxY": 0.95, "series": [{"data": [[1.66650282E12, 0.95], [1.66650288E12, 0.48333333333333334]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.66650282E12, 0.016666666666666666], [1.66650288E12, 0.45]], "isOverall": false, "label": "304", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66650288E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.66650282E12, "maxY": 0.03333333333333333, "series": [{"data": [[1.66650282E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/-26-success", "isController": false}, {"data": [[1.66650288E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-15-success", "isController": false}, {"data": [[1.66650288E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-9-success", "isController": false}, {"data": [[1.66650288E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-20-success", "isController": false}, {"data": [[1.66650288E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-5-success", "isController": false}, {"data": [[1.66650282E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/-41-success", "isController": false}, {"data": [[1.66650282E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/-39-success", "isController": false}, {"data": [[1.66650282E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglapuzzle.com/-1-success", "isController": false}, {"data": [[1.66650288E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-24-success", "isController": false}, {"data": [[1.66650282E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/-22-success", "isController": false}, {"data": [[1.66650288E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-11-success", "isController": false}, {"data": [[1.66650288E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-6-success", "isController": false}, {"data": [[1.66650288E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-11-success", "isController": false}, {"data": [[1.66650282E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/-35-success", "isController": false}, {"data": [[1.66650288E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-3-success", "isController": false}, {"data": [[1.66650282E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/-49-success", "isController": false}, {"data": [[1.66650288E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-success", "isController": false}, {"data": [[1.66650288E12, 0.016666666666666666]], "isOverall": false, "label": "Test-success", "isController": true}, {"data": [[1.66650288E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-27-success", "isController": false}, {"data": [[1.66650282E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/-50-success", "isController": false}, {"data": [[1.66650282E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/-5-success", "isController": false}, {"data": [[1.66650282E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/-16-success", "isController": false}, {"data": [[1.66650282E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/-45-success", "isController": false}, {"data": [[1.66650282E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/-9-success", "isController": false}, {"data": [[1.66650288E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-19-success", "isController": false}, {"data": [[1.66650282E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/-12-success", "isController": false}, {"data": [[1.66650288E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-15-success", "isController": false}, {"data": [[1.66650282E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/-31-success", "isController": false}, {"data": [[1.66650288E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-1-success", "isController": false}, {"data": [[1.66650288E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-20-success", "isController": false}, {"data": [[1.66650288E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-14-success", "isController": false}, {"data": [[1.66650282E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/-25-success", "isController": false}, {"data": [[1.66650288E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-6-success", "isController": false}, {"data": [[1.66650282E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/-42-success", "isController": false}, {"data": [[1.66650288E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-21-success", "isController": false}, {"data": [[1.66650282E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/-10-success", "isController": false}, {"data": [[1.66650288E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-19-success", "isController": false}, {"data": [[1.66650288E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-10-success", "isController": false}, {"data": [[1.66650282E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/-21-success", "isController": false}, {"data": [[1.66650288E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-25-success", "isController": false}, {"data": [[1.66650282E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/-38-success", "isController": false}, {"data": [[1.66650282E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglapuzzle.com/-0-success", "isController": false}, {"data": [[1.66650282E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/-51-success", "isController": false}, {"data": [[1.66650288E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-5-success", "isController": false}, {"data": [[1.66650282E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/-34-success", "isController": false}, {"data": [[1.66650288E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-12-success", "isController": false}, {"data": [[1.66650282E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/-17-success", "isController": false}, {"data": [[1.66650282E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/-4-success", "isController": false}, {"data": [[1.66650288E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-2-success", "isController": false}, {"data": [[1.66650288E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-2-success", "isController": false}, {"data": [[1.66650282E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/-success", "isController": false}, {"data": [[1.66650288E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-9-success", "isController": false}, {"data": [[1.66650282E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/-46-success", "isController": false}, {"data": [[1.66650282E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/-29-success", "isController": false}, {"data": [[1.66650282E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/-8-success", "isController": false}, {"data": [[1.66650288E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-18-success", "isController": false}, {"data": [[1.66650282E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/-30-success", "isController": false}, {"data": [[1.66650282E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/-13-success", "isController": false}, {"data": [[1.66650288E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-16-success", "isController": false}, {"data": [[1.66650288E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-7-success", "isController": false}, {"data": [[1.66650282E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/-11-success", "isController": false}, {"data": [[1.66650288E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-13-success", "isController": false}, {"data": [[1.66650288E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-22-success", "isController": false}, {"data": [[1.66650282E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/-24-success", "isController": false}, {"data": [[1.66650288E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-8-success", "isController": false}, {"data": [[1.66650282E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/-52-success", "isController": false}, {"data": [[1.66650282E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/-20-success", "isController": false}, {"data": [[1.66650282E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/-37-success", "isController": false}, {"data": [[1.66650288E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-26-success", "isController": false}, {"data": [[1.66650282E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/-3-success", "isController": false}, {"data": [[1.66650288E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-success", "isController": false}, {"data": [[1.66650282E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/-19-success", "isController": false}, {"data": [[1.66650282E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/-33-success", "isController": false}, {"data": [[1.66650288E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-22-success", "isController": false}, {"data": [[1.66650282E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/-18-success", "isController": false}, {"data": [[1.66650282E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/-7-success", "isController": false}, {"data": [[1.66650282E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/-47-success", "isController": false}, {"data": [[1.66650288E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-1-success", "isController": false}, {"data": [[1.66650288E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-13-success", "isController": false}, {"data": [[1.66650282E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/-14-success", "isController": false}, {"data": [[1.66650288E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-17-success", "isController": false}, {"data": [[1.66650282E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/-43-success", "isController": false}, {"data": [[1.66650288E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-3-success", "isController": false}, {"data": [[1.66650288E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-17-success", "isController": false}, {"data": [[1.66650282E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/-28-success", "isController": false}, {"data": [[1.66650282E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/-40-success", "isController": false}, {"data": [[1.66650288E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-8-success", "isController": false}, {"data": [[1.66650288E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-16-success", "isController": false}, {"data": [[1.66650288E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-4-success", "isController": false}, {"data": [[1.66650288E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-7-success", "isController": false}, {"data": [[1.66650282E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/-23-success", "isController": false}, {"data": [[1.66650288E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-23-success", "isController": false}, {"data": [[1.66650288E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-12-success", "isController": false}, {"data": [[1.66650282E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/-36-success", "isController": false}, {"data": [[1.66650282E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/-53-success", "isController": false}, {"data": [[1.66650288E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-10-success", "isController": false}, {"data": [[1.66650282E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglapuzzle.com/-2-success", "isController": false}, {"data": [[1.66650282E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/-6-success", "isController": false}, {"data": [[1.66650288E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-21-success", "isController": false}, {"data": [[1.66650282E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/-32-success", "isController": false}, {"data": [[1.66650282E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/-48-success", "isController": false}, {"data": [[1.66650288E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-14-success", "isController": false}, {"data": [[1.66650288E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-4-success", "isController": false}, {"data": [[1.66650288E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/products-0-success", "isController": false}, {"data": [[1.66650282E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/-15-success", "isController": false}, {"data": [[1.66650288E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-18-success", "isController": false}, {"data": [[1.66650288E12, 0.03333333333333333]], "isOverall": false, "label": "https://www.banglapuzzle.com/news-0-success", "isController": false}, {"data": [[1.66650282E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/-27-success", "isController": false}, {"data": [[1.66650282E12, 0.016666666666666666]], "isOverall": false, "label": "https://www.banglapuzzle.com/-44-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66650288E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 0.95, "minX": 1.66650282E12, "maxY": 0.9666666666666667, "series": [{"data": [[1.66650282E12, 0.9666666666666667], [1.66650288E12, 0.95]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66650288E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}
