import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { GraphicsService } from 'src/app/services/graphics.service';
@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.css']
})
export class GraphicsComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  private incidents: any;
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {},
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    },
    elements: {
      bar: {
        backgroundColor: 'rgba(0, 0, 255, 0.5)', // Define el color de fondo de las barras
      },
    },
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [DataLabelsPlugin];

  public barChartData: ChartData<'bar'> = {
    labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
    datasets: [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' }
    ],
  };
  constructor(private graphicsService: GraphicsService) { }
  ngOnInit(): void {
    this.getincidentss();
  }
  private getincidentss(): void {
    console.warn("entrando");
    this.graphicsService.getincidents().subscribe(data => {
      this.incidents = data;
      console.log(this.incidents);
      this.barChartData.labels = this.incidents.headers;
      this.barChartData.datasets[0].data = this.incidents.data
      this.barChartData.datasets[0].label = "Cursos con mayores Incidencias de plagio"
      this.chart?.update();
    });
  }





  public randomize(): void {
    // Only Change 3 values
    this.barChartData.datasets[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      Math.round(Math.random() * 100),
      56,
      Math.round(Math.random() * 100),
      40,
    ];

    this.chart?.update();
  }

}
