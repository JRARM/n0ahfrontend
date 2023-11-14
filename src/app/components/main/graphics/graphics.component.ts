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
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
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
  //general charts options
  public generalChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {
        beginAtZero: true
      }
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
      line: {
      },
    },
  };


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

  public lineChartType: ChartType = 'line';
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [DataLabelsPlugin];

  //activity for day 
  public activityfordaysbarChartData: ChartData<'line'> = {
    labels: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'],
    datasets: [
      { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Total Acciones por dia', borderColor: 'rgba(100, 200, 100, 1)' }
    ],
  };

  public activityforhoursbarChartData: ChartData<'bar'> = {
    labels: ['00:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00',
      '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'
      , '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
    datasets: [
      { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Total Acciones por Hora', borderColor: 'rgba(100, 200, 100, 1)' }
    ],
  };


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
      { data: [0, 0, 0, 0, 0, 0], label: 'Incidencia de Usuarios sospechosos' }
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
    this.getGeneralActivity();
    this.getincidentss();
    this.getAllUsers();
    this.getAllCourses();
  }

  getAllSuspects(queryData: any): void {
    this.graphicsService.getAllSuspects(queryData).subscribe(data => {
      console.log(data);
      this.SuspectsbarChartData = {
        labels: data.usernames,
        datasets: [
          { data: data.timeincidents, label: 'Incidencia de Usuarios sospechosos' },],
      };
    })


  }


  getGeneralActivity(): void {
    this.graphicsService.getactivityforday().subscribe(data => {
      console.log(data);

      this.activityfordaysbarChartData = {
        labels: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'],
        datasets: [
          { data: [data[0].count, data[1].count, data[2].count, data[3].count, data[4].count, data[5].count, data[6].count], label: 'Total Acciones por Dia', borderColor: 'rgba(100, 200, 100, 1)' }
        ],
      };
    });

    this.graphicsService.getactivitybyhour().subscribe(data => {
      console.log(data);
      this.activityforhoursbarChartData = {
        labels: ['00:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00',
          '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'
          , '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
        datasets: [
          {
            data: [data[0].count, data[1].count, data[2].count, data[3].count,
            data[4].count, data[5].count, data[6].count, data[7].count, data[8].count, data[9].count
              , data[10].count, data[11].count, data[12].count, data[13].count, data[14].count, data[15].count, data[16].count, data[17].count
              , data[18].count, data[19].count, data[20].count, data[21].count, data[22].count, data[23].count], label: 'Total Acciones por Hora'

            , borderColor: 'rgba(100, 200, 100, 1)'

          }
        ],
      };
    });

  }


  searchSuspects(): void {
    console.log("searching suscpects");
    this.getAllSuspects({ course: this.selectedCourse, answer: this.selectedAnswer, date: this.selectedDate });
  }

  onChangeSelect(): void {
    console.log(this.selecteduser);
    this.getUserActivity(this.selecteduser);


  }

  onChangeCourse(): void {
    this.getallanswerCourse(this.selectedCourse);
  }

  onAnswerChange(): void {
    this.getalldatesCourse({ course: this.selectedCourse, answer: this.selectedAnswer });
  }

  private getalldatesCourse(queryData: any): void {
    this.graphicsService.getAllDatesCourse(queryData).subscribe(data => {
      console.log(data);
      this.dates = data;

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
      this.UserActionsbarChartData = {
        labels: data.names,
        datasets: [
          { data: data.counts, label: 'Acciones de Usuario ' + this.selecteduser }
        ],
      };


      // this.UserActionsbarChartData.labels = data.names;
      // this.UserActionsbarChartData.datasets[0].data = data.counts;
      // this.UserActionsbarChartData.datasets[0].label = 'Acciones de Usuario ' + this.selecteduser;
      // this.chart?.update();
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
