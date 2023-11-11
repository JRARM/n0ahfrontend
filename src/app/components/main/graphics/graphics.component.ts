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
  @ViewChild(BaseChartDirective) userActionschart: BaseChartDirective | undefined;
  private incidents: any;
  private userActions: any;
  private userName = "Maria_Lugo_Cujar";
  //ng select test




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
        backgroundColor: 'rgba(216, 250, 8, 1)', // Define el color de fondo de las barras
      },
    },
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [DataLabelsPlugin];

  //useractions barchartdata init
  public UserActionsbarChartData: ChartData<'bar'> = {
    labels: ['0', '0', '0', '0', '0', '0', '0'],
    datasets: [
      { data: [0, 0, 0, 0, 0, 0, 0], label: 'Acciones de Usuario' }
    ],
  };


  public barChartData: ChartData<'bar'> = {
    labels: ['0', '0', '0', '0', '0', '0', '0'],
    datasets: [
      { data: [0, 0, 0, 0, 0, 0, 0], label: 'Cursos con mayores Incidencias de plagio' }
    ],
  };
  constructor(private graphicsService: GraphicsService) { }
  ngOnInit(): void {
    this.getincidentss();
    this.getUserActivity();
  }

  private getUserActivity(): void {
    this.graphicsService.getUserAction({ userName: this.userName }).subscribe(data => {
      console.log(data);
      this.UserActionsbarChartData.labels = data.names;
      this.UserActionsbarChartData.datasets[0].data = data.counts;
      this.UserActionsbarChartData.datasets[0].label = 'Acciones de Usuario ' + this.userName;

      this.userActionschart?.update();
    });
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






}
