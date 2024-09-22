import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { DataService } from '../data.service';


@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {


public dataSource :any ={
      datasets:[
          {
              data: [],
              backgroundColor: [
                  '#CC0003',
                  '#45818d',
                  '#c90078',
                  '#783f09',
                  '#ffcd51',
                  '#ff6383',
                  '#36a2e0',
                  '#fd6b19',
                  '#f6b26f'
              ],
          }
      ],
      labels: []
  };


  constructor(private http: HttpClient, private dataService: DataService) { }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/budget')
    .subscribe((res: any) => {
        for(var i = 0; i < res.myBudget.length; i++){
          this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
          this.dataSource.labels[i] = res.myBudget[i].title;
          this.createChart();
        }

        });
      }

      createChart() {
        // var ctx = document.getElementById("myChart").getContext("2d");
        var ctx = document.getElementById('myChart') as HTMLCanvasElement;
        var existingChart = Chart.getChart(ctx);

        if (existingChart) {
          existingChart.destroy();
        }

        var myPieChart = new Chart(ctx, {
            type: 'pie',
            data: this.dataSource
        });
      }
    }
