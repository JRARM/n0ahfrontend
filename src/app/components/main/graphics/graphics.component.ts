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

  //global var
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @ViewChild(BaseChartDirective) userActionschart: BaseChartDirective | undefined;
  private incidents: any;
  private userActions: any;
  public selecteduser: any;
  public selectedCourse: any;
  public selectedAnswer: any;
  public selectedDate: any;
  public users = [];
  public courses = [];
  public answers = [];
  public dates = [];
  private userName: any;
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
        backgroundColor: 'rgba(216, 250, 250, 1)', // Define el color de fondo de las barras
      },
    },
  };

  public suspectsChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        type: 'time',
        time: {
          unit: 'day',
          displayFormats: {
            day: 'MMM D',
          }
        }
      },
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
        backgroundColor: 'rgba(216, 250, 250, 1)', // Define el color de fondo de las barras
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

  //useractions barchartdata init
  public SuspectsbarChartData: ChartData<'bar'> = {
    labels: ['0', '0', '0', '0', '0', '0', '0'],
    datasets: [
      { data: [0, 0, 0, 0, 0, 0], label: 'Sospechosos' }
    ],
  };
  public data = [
    { x: new Date('2020-04-30'), y: 5 },
    { x: new Date('2020-05-01'), y: 10 },
  ];

  public barChartData: ChartData<'bar'> = {
    labels: ['0', '0', '0', '0', '0', '0', '0'],
    datasets: [
      { data: [0, 0, 0, 0, 0, 0, 0], label: 'Cursos con mayores Incidencias de plagio' }
    ],
  };
  constructor(private graphicsService: GraphicsService) { }
  ngOnInit(): void {
    this.getincidentss();
    this.getAllUsers();
    this.getAllCourses();
  }

  searchSuspects(): void {
    console.log("searching suscpects");
    this.SuspectsbarChartData = {
      labels: ['ana', 'pedro', 'luis', 'andres', 'juan', 'perez', 'raiz'],
      datasets: [
        { data: [3, 4, 3, 4, 3, 4], label: 'ana' },],
    };
  }

  onChangeSelect(): void {
    console.log(this.selecteduser);
    this.getUserActivity(this.selecteduser);


  }

  onChangeCourse(): void {
    this.getallanswerCourse(this.selectedCourse);
    this.getalldatesCourse(this.selectedCourse);
  }

  private getalldatesCourse(course: any): void {
    this.graphicsService.getAllDatesCourse({ course: course }).subscribe(data => {
      console.log(data);
      this.dates = data.courseDates;

    })
  }

  private getallanswerCourse(course: any): void {
    this.graphicsService.getAllAnswersCourse({ course: course }).subscribe(data => {
      console.log(data);
      this.answers = data.answersByCourse;
    });
  }

  private getAllCourses(): void {
    this.graphicsService.getAllCourses().subscribe(data => {
      console.log(data);
      this.courses = data.courses;
    });

  }


  private getAllUsers(): void {
    this.graphicsService.getallusers().subscribe(data => {
      console.log(data);
      this.users = data.users
    })
  }


  private getUserActivity(name: string): void {
    this.graphicsService.getUserAction({ userName: name }).subscribe(data => {
      console.log(data);
      this.UserActionsbarChartData.labels = data.names;
      this.UserActionsbarChartData.datasets[0].data = data.counts;
      this.UserActionsbarChartData.datasets[0].label = 'Acciones de Usuario ' + this.selecteduser;
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
