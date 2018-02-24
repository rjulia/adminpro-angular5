import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { Title , Meta, MetaDefinition} from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styles: []
})
export class BreadcrumbComponent implements OnInit {


  label:string = '';

  constructor(private router: Router,
              public _title:Title,
              public _meta: Meta) {
      //nos subcribimos a la data
      this.getDataRoute().subscribe( data => {
        console.log(data)
        this.label = data.titulo;
        //añade el titulo de pagina, lo podemos aplicar desde cualquier parte
        this._title.setTitle(this.label)

        //let metaTag:MetaDefinition = {name: 'description', content: this.label};
        //this._meta.updateTag(metaTag);

        this._meta.addTags([

          { 'http-Equiv': 'X-UA-Compatible', content: "IE=edge"},
          { name: 'description', content: data.description},
          { name: 'keyboards', content: data.keyboards},
          { name: 'title', content: this.label },
          { name: 'twitter:card', content: 'Ramon Julia' },
          { name: 'twitter:site', content: '@tuempresa' },
          { name: 'twitter:title', content: this.label },
          { name: 'twitter:description', content: data.description },
          { name: 'twitter:creator', content: '@ramonjuliachias'},
          { name: 'twitter:image', content:"http://www.tudominio.com/tuimagendelanoticia.jpg" },
          //Open Graph data para facebook
          { name:"og:title", content: this.label},
          { name:"og:type", content: "article"},
          { name:"og:url", content: "http://www.tudominio.com/"},
          { name:"og:image", content: "http://www.tudominio.com/tuimagendelanoticia.jpg"},
          { name:"og:description", content: data.description  },
          { name:"og:site_name", content: "Site Name, i.e. Moz"},
          { name:"fb:admins", content: "Facebook numeric ID"},
        ]);
      })
   }


  getDataRoute(){
    //ROUUter Events, las rutos emiten mucha infomacion, y te puedes subcribir a ellas con un obserbable, en el routing hemos puesto una objeto que es la data y que por ejemplo nos ayuda a poner un titulo en cada una delas secciones, pero cuando hacemos la llmada es lleba mucha informacion, por eso con filter() y instanceof ActivationEnd vamos quedandonos con la unica respuesta de las miles qeu da, uy con el map, lo que hacemos es mapear con solo lo que queremos que es el DATA

    //podria esta en un servicio y ser utilizado para otros
    return this.router.events
    //filtramos para que nos de solo los ActivationEbd
    .filter(event => event instanceof ActivationEnd)
    //nos da dos, aqui filtramos buscando un parametro qeu nos ayude, en este caso fristchil === null
    .filter((event:ActivationEnd) => event.snapshot.firstChild === null)
    //mapeamos la infomracion que qeuremos
    .map((event:ActivationEnd)=> event.snapshot.data)
  }


  ngOnInit() {
  }

}
