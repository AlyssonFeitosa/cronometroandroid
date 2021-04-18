import React,{ Component } from 'react';
import { Button, ScrollView, Text, View, Image, ImageBackground } from 'react-native';

import { styles, styles2, styles3 } from './src/styles/index.js';



class Mo extends Component {
  constructor(props){
    super(props);

    this.state = {
      horas: 0,
      minutos: 0,
      segundos: 0,
      ativo: false,
      voltas:[]
    }

    this.pulsoDeClock = this.pulsoDeClock.bind(this);
    this.iniciaRelogio = this.iniciaRelogio.bind(this);
    this.pararRelogio = this.pararRelogio.bind(this);
    this.marcarVolta = this.marcarVolta.bind(this);
    this.zerarRelogio = this.zerarRelogio.bind(this);

  }
   
  iniciaRelogio(){
    if(!this.state.ativo){
      this.setState({clock : setInterval(this.pulsoDeClock,100)});
      this.setState({ativo: true})
    }
  }
  
  pulsoDeClock(){
    var h = this.state.horas;
    var m = this.state.minutos;
    var s = this.state.segundos;

    if(s<59){
      s++;
    }else{
     s= 0;
     if(m<59){
       m++;
     }else{
       m=0;
       h++
     }
    }

    this.setState({segundos: s, minutos: m, horas: h})
  }

  pararRelogio(){
    if(this.state.ativo){
      clearInterval(this.state.clock);
      this.setState({ativo:false});
    }
  }

  marcarVolta(){
    var txtDoCronometro = this.formatar(this.state.horas) + ":" + this.formatar(this.state.minutos) + ":" + this.formatar(this.state.segundos)+"\n";
    this.state.voltas.push(txtDoCronometro);
    this.forceUpdate(); 
  }
  formatar(t){
    return (t<10) ? "0" +t.toString() : t.toString();
  }

  zerarRelogio(){
    this.pararRelogio();
    this.setState({segundos:0, minutos:0, horas:0});

    if(this.state.voltas.length>0){
      this.state.voltas.push('....... \n');
    }
  }

  render()
  {
    var txtH = this.formatar(this.state.horas);
    var txtM = this.formatar(this.state.minutos);
    var txtS = this.formatar(this.state.segundos);
    let logoLocal = require ('./src/images/boneco.png');

    return(
      <ScrollView>
        <View>
          <Text style={styles2.estilosTextoCronometro}>Cronômetro WB Esportes</Text>
          <Image 
            style = {{width:370, height:220}} 
            source = {logoLocal} />
          <Text style={styles.estilosContagemCronometro}>{txtH}:{txtM}:{txtS}:</Text>
        </View>
        <View style={styles3.estilosBotoes}>
          <Button onPress={(this.state.ativo ? this.pararRelogio : this.iniciaRelogio)}
          title={(this.state.ativo ? 'Pausar' : 'Inicar')} /><View style={{flexDirection:'row-reverse', justifyContent:'center'}}>
          <Button onPress={(this.state.ativo ? this.marcarVolta : this.zerarRelogio)}
          title={(this.state.ativo ? 'Salvar' : 'Zerar')}/>
        </View>
        </View>
        <View>
          <Text style={{fontSize:20}}>
            {this.state.voltas}
          </Text>
        </View>
      </ScrollView>
    )

  }
}
export default Mo;


