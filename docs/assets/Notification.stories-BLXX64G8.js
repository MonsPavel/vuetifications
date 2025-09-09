import{r as Z,d as I,c as N,a as c,o as r,F as k,b as S,u as m,n as x,e as R,w as M,f as w,g as L,t as T,T as z,h as D}from"./iframe-z5f3RJZk.js";import"./preload-helper-D9Z9MdNV.js";const u=Z([]);let E=0;const p=new Map;function V(){const s=o=>{const n=++E,i={id:n,type:"info",duration:3e3,position:"top-right",closable:!1,animation:o.animation||"slide-fade",...o};if(u.value.push(i),i.duration&&i.duration>0){const e=setTimeout(()=>{a(n)},i.duration);p.set(n,e)}return n},a=o=>{p.has(o)&&(clearTimeout(p.get(o)),p.delete(o));const n=u.value.findIndex(i=>i.id===o);n>-1&&u.value.splice(n,1)};return{notifications:u,add:s,remove:a}}const v=V(),W="data:image/svg+xml,%3csvg%20class='w-6%20h-6'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M10.2904%201.13038C12.6207%200.763266%2015.0028%201.15596%2017.0873%202.24269L17.4994%202.46925L17.5854%202.52394C17.9968%202.82012%2018.1252%203.38591%2017.8666%203.83449C17.6078%204.28303%2017.0536%204.45538%2016.5912%204.24757L16.5004%204.2007L16.1625%204.01613C14.4572%203.12711%2012.5084%202.80569%2010.602%203.10597C8.56851%203.42634%206.70597%204.43432%205.32559%205.96144C3.94523%207.48863%203.12994%209.44314%203.01602%2011.4985C2.90214%2013.554%203.49639%2015.587%204.69962%2017.2573C5.90283%2018.9276%207.64272%2020.1352%209.62833%2020.6782C11.6139%2021.2212%2013.726%2021.0672%2015.6117%2020.2417C17.4976%2019.4162%2019.0436%2017.9685%2019.9916%2016.1411C20.8803%2014.428%2021.1931%2012.4777%2020.89%2010.5786L20.8207%2010.1997L20.8061%2010.0982C20.7557%209.59404%2021.0939%209.12353%2021.601%209.02003C22.1085%208.91663%2022.6046%209.21756%2022.7553%209.70167L22.7807%209.80031L22.8647%2010.2632C23.2351%2012.5846%2022.8524%2014.9681%2021.766%2017.062C20.6073%2019.2954%2018.7184%2021.0648%2016.4135%2022.0737C14.1088%2023.0826%2011.5278%2023.2705%209.10098%2022.6069C6.67407%2021.9432%204.54717%2020.4678%203.07657%2018.4263C1.60599%2016.3847%200.879793%2013.9004%201.01895%2011.3882C1.15815%208.87596%202.15505%206.48723%203.8422%204.62062C5.52933%202.75412%207.8051%201.52195%2010.2904%201.13038Z'%20fill='%23fff'%20style='fill-opacity:1;'/%3e%3cpath%20d='M21.3692%203.22461C21.7619%202.90426%2022.3409%202.92685%2022.707%203.29297C23.0732%203.65909%2023.0958%204.23809%2022.7754%204.63086L22.707%204.70703L12.707%2014.707C12.3409%2015.0731%2011.7619%2015.0957%2011.3692%2014.7754L11.293%2014.707L8.29298%2011.707L8.22462%2011.6309C7.90427%2011.2381%207.92686%2010.6591%208.29298%2010.293C8.65909%209.92685%209.2381%209.90426%209.63087%2010.2246L9.70704%2010.293L12%2012.5859L21.293%203.29297L21.3692%203.22461Z'%20fill='%23fff'%20style='fill-opacity:1;'/%3e%3c/svg%3e",H="data:image/svg+xml,%3csvg%20class='w-6%20h-6'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M21%2012C21%207.02944%2016.9706%203%2012%203C7.02944%203%203%207.02944%203%2012C3%2016.9706%207.02944%2021%2012%2021C16.9706%2021%2021%2016.9706%2021%2012ZM23%2012C23%2018.0751%2018.0751%2023%2012%2023C5.92487%2023%201%2018.0751%201%2012C1%205.92487%205.92487%201%2012%201C18.0751%201%2023%205.92487%2023%2012Z'%20fill='%23fff'%20style='fill-opacity:1;'/%3e%3cpath%20d='M14.293%208.29297C14.6835%207.90245%2015.3165%207.90245%2015.707%208.29297C16.0976%208.68349%2016.0976%209.31651%2015.707%209.70703L9.70703%2015.707C9.31651%2016.0976%208.68349%2016.0976%208.29297%2015.707C7.90245%2015.3165%207.90245%2014.6835%208.29297%2014.293L14.293%208.29297Z'%20fill='%23fff'%20style='fill-opacity:1;'/%3e%3cpath%20d='M8.29297%208.29297C8.65909%207.92685%209.23809%207.90426%209.63086%208.22461L9.70703%208.29297L15.707%2014.293L15.7754%2014.3691C16.0957%2014.7619%2016.0731%2015.3409%2015.707%2015.707C15.3409%2016.0731%2014.7619%2016.0957%2014.3691%2015.7754L14.293%2015.707L8.29297%209.70703L8.22461%209.63086C7.90426%209.23809%207.92685%208.65909%208.29297%208.29297Z'%20fill='%23fff'%20style='fill-opacity:1;'/%3e%3c/svg%3e",$="data:image/svg+xml,%3csvg%20class='w-6%20h-6'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M21%2012C21%207.02944%2016.9706%203%2012%203C7.02944%203%203%207.02944%203%2012C3%2016.9706%207.02944%2021%2012%2021C16.9706%2021%2021%2016.9706%2021%2012ZM23%2012C23%2018.0751%2018.0751%2023%2012%2023C5.92487%2023%201%2018.0751%201%2012C1%205.92487%205.92487%201%2012%201C18.0751%201%2023%205.92487%2023%2012Z'%20fill='%23fff'%20style='fill-opacity:1;'/%3e%3cpath%20d='M11%2016V12C11%2011.4477%2011.4477%2011%2012%2011C12.5523%2011%2013%2011.4477%2013%2012V16C13%2016.5523%2012.5523%2017%2012%2017C11.4477%2017%2011%2016.5523%2011%2016Z'%20fill='%23fff'%20style='fill-opacity:1;'/%3e%3cpath%20d='M12.0098%207L12.1123%207.00488C12.6165%207.05611%2013.0098%207.48224%2013.0098%208C13.0098%208.51776%2012.6165%208.94389%2012.1123%208.99512L12.0098%209H12C11.4477%209%2011%208.55228%2011%208C11%207.44772%2011.4477%207%2012%207H12.0098Z'%20fill='%23fff'%20style='fill-opacity:1;'/%3e%3c/svg%3e",P="data:image/svg+xml,%3csvg%20class='w-6%20h-6'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M12.1881%201.99294C12.6497%202.02349%2013.0992%202.16046%2013.5006%202.39431C13.9579%202.66086%2014.3367%203.04351%2014.5982%203.50368L22.5963%2017.4998L22.689%2017.6736C22.8918%2018.085%2022.9974%2018.5384%2022.9976%2018.9988C22.9978%2019.5251%2022.8601%2020.0429%2022.5972%2020.4988C22.3343%2020.9548%2021.9552%2021.3329%2021.4996%2021.5965C21.044%2021.86%2020.5269%2021.9992%2020.0006%2021.9998H3.99958V21.9988C3.47393%2022.0019%202.95667%2021.868%202.49958%2021.6082C2.03976%2021.3468%201.65671%2020.9684%201.3902%2020.5115C1.12383%2020.0547%200.983173%2019.5354%200.982002%2019.0066C0.980853%2018.4791%201.11924%2017.9608%201.38239%2017.5037H1.38142L9.38142%203.50368C9.64301%203.04336%2010.0225%202.66089%2010.48%202.39431C10.9385%202.12724%2011.4593%201.98614%2011.9898%201.98611L12.1881%201.99294ZM11.858%203.9949C11.7275%204.01227%2011.6014%204.05521%2011.4869%204.12185C11.334%204.21091%2011.2069%204.33905%2011.1197%204.49294L11.1187%204.49587L3.11872%2018.4959L3.11579%2018.4998C3.02763%2018.6525%202.98161%2018.8264%202.982%2019.0027C2.98246%2019.1787%203.02913%2019.3516%203.11774%2019.5037C3.20658%2019.656%203.33459%2019.7828%203.48786%2019.8699C3.64103%2019.9569%203.81464%2020.0013%203.99079%2019.9998H19.9986C20.174%2019.9996%2020.3468%2019.9538%2020.4986%2019.866C20.6504%2019.7782%2020.7762%2019.6516%2020.8638%2019.4998C20.9515%2019.3478%2020.9977%2019.1752%2020.9976%2018.9998C20.9976%2018.8243%2020.9516%2018.6517%2020.8638%2018.4998L20.8619%2018.4959L12.8619%204.49587L12.8599%204.49294C12.7727%204.33912%2012.6465%204.21088%2012.4937%204.12185C12.3409%204.03279%2012.1667%203.98611%2011.9898%203.98611L11.858%203.9949Z'%20fill='%23686583'%20style='fill-opacity:1;'/%3e%3cpath%20d='M11%2013V9C11%208.44772%2011.4477%208%2012%208C12.5523%208%2013%208.44772%2013%209V13C13%2013.5523%2012.5523%2014%2012%2014C11.4477%2014%2011%2013.5523%2011%2013Z'%20fill='%23686583'%20style='fill-opacity:1;'/%3e%3cpath%20d='M12.0098%2016L12.1123%2016.0049C12.6165%2016.0561%2013.0098%2016.4822%2013.0098%2017C13.0098%2017.5178%2012.6165%2017.9439%2012.1123%2017.9951L12.0098%2018H12C11.4477%2018%2011%2017.5523%2011%2017C11%2016.4477%2011.4477%2016%2012%2016H12.0098Z'%20fill='%23686583'%20style='fill-opacity:1;'/%3e%3c/svg%3e",O={success:W,error:H,info:$,warning:P},A=s=>{const{icon:a,type:o}=s;return a||(o?O[o]:"")},_=["top-left","top-right","bottom-left","bottom-right"],G={class:"notifications-root"},j=["aria-label"],q=["aria-live"],J=["src"],K={class:"notification__content"},Q={key:0,class:"notification__title"},U={class:"notification__message"},X=["onClick"],F=I({__name:"NotificationContainer",setup(s){const a=N(()=>{const o={};return _.forEach(n=>{o[n]=v.notifications.value.filter(i=>i.position===n)}),o});return(o,n)=>(r(),c("div",G,[(r(!0),c(k,null,S(m(_),i=>(r(),c("div",{key:i,class:x(["notifications-container",`notifications-container--${i}`]),role:"region","aria-label":`Notifications ${i}`},[R(z,{name:"notification-group",tag:"div",class:"notifications-list"},{default:M(()=>[(r(!0),c(k,null,S(a.value[i],e=>(r(),c("div",{key:e.id,class:x(["notification",[`notification--${e.type}`,`notification-animation--${e.animation||"slide-fade"}`,{"notification--has-title":e.title}]]),role:"alert","aria-live":e.type==="error"?"assertive":"polite"},[m(A)(e)?(r(),c("img",{key:0,src:m(A)(e),class:"notification__icon",alt:"","aria-hidden":"true"},null,8,J)):w("",!0),L("div",K,[e.title?(r(),c("h4",Q,T(e.title),1)):w("",!0),L("p",U,T(e.message),1)]),e.closable||e.duration===0?(r(),c("button",{key:1,class:"notification__close","aria-label":"Close notification",onClick:B=>m(v).remove(e.id)},[...n[0]||(n[0]=[L("span",{"aria-hidden":"true"},"×",-1)])],8,X)):w("",!0)],10,q))),128))]),_:2},1024)],10,j))),128))]))}});F.__docgenInfo={exportName:"default",displayName:"NotificationContainer",description:"",tags:{},sourceFiles:["/home/runner/work/vuetifications/vuetifications/src/components/NotificationContainer.vue"]};class l{static instance;mounted=!1;constructor(){}static getInstance(){return l.instance||(l.instance=new l),l.instance}mount(){if(this.mounted)return;const a=document.createElement("div");document.body.appendChild(a),D(F).mount(a),this.mounted=!0}}const Y=l.getInstance();function t(s){Y.mount(),v.add(s)}const n2={title:"Notifications/vuetifications",tags:["autodocs"]},g={render:()=>({template:'<button @click="show">Show Success</button>',setup(){return{show:()=>t({title:"Success",message:"This is a success message!",type:"success"})}}})},f={render:()=>({template:'<button @click="show">Show Error</button>',setup(){return{show:()=>t({title:"Error",message:"Something went wrong!",type:"error"})}}})},d={render:()=>({template:'<button @click="show">Show Info</button>',setup(){return{show:()=>t({title:"Info",message:"Information",type:"info"})}}})},h={render:()=>({template:'<button @click="show">Show Warning</button>',setup(){return{show:()=>t({title:"Warning",message:"Warning!",type:"warning"})}}})},b={render:()=>({template:`<div class="flex gap-2">
      <button @click="topLeft" style="margin-right: 10px">Top Left</button>
      <button @click="topRight" style="margin-right: 10px">Top Right</button>
      <button @click="bottomLeft" style="margin-right: 10px">Bottom Left</button>
      <button @click="bottomRight">Bottom Right</button>
    </div>`,setup(){return{topLeft:()=>t({message:"Top left notification",position:"top-left"}),bottomRight:()=>t({message:"Bottom right notification",position:"bottom-right"}),topRight:()=>t({message:"Bottom right notification",position:"top-right"}),bottomLeft:()=>t({message:"Bottom right notification",position:"bottom-left"})}}})},C={render:()=>({template:`<div class="flex gap-2">
      <button @click="closable" style="margin-right: 10px">closable</button>
      <button @click="zeroDuration">zeroDuration</button>
    </div>`,setup(){return{closable:()=>t({message:"This is closable notification, duration 1 min",position:"top-left",closable:!0,duration:6e4,type:"warning"}),zeroDuration:()=>t({title:"zeroDuration",message:"This notification can close only by click. This notification can close only by click. This notification can close only by click.",position:"top-left",duration:0})}}})},y={render:()=>({template:`<div class="flex gap-2">
      <button @click="SlideFade" style="margin-right: 10px">Slide Fade</button>
      <button @click="Fade" style="margin-right: 10px">Fade</button>
      <button @click="Slide" style="margin-right: 10px">Slide</button>
      <button @click="Scale" style="margin-right: 10px">Scale</button>
      <button @click="Bounce" style="margin-right: 10px">Bounce</button>
      <button @click="Flip" style="margin-right: 10px">Flip</button>
      <button @click="Zoom" style="margin-right: 10px">Zoom</button>
      <button @click="None" style="margin-right: 10px">None</button>
    </div>`,setup(){return{SlideFade:()=>t({title:"Animations",message:"Animations Test",animation:"slide-fade"}),Fade:()=>t({title:"Animations",message:"Animations Test",animation:"fade"}),Slide:()=>t({title:"Animations",message:"Animations Test",animation:"slide"}),Scale:()=>t({title:"Animations",message:"Animations Test",animation:"scale"}),Bounce:()=>t({title:"Animations",message:"Animations Test",animation:"bounce"}),Flip:()=>t({title:"Animations",message:"Animations Test",animation:"flip"}),Zoom:()=>t({title:"Animations",message:"Animations Test",animation:"zoom"}),None:()=>t({title:"Animations",message:"Animations Test",animation:"none"})}}})};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => ({
    template: \`<button @click="show">Show Success</button>\`,
    setup() {
      const show = () => notify({
        title: 'Success',
        message: 'This is a success message!',
        type: 'success'
      });
      return {
        show
      };
    }
  })
}`,...g.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => ({
    template: \`<button @click="show">Show Error</button>\`,
    setup() {
      const show = () => notify({
        title: 'Error',
        message: 'Something went wrong!',
        type: 'error'
      });
      return {
        show
      };
    }
  })
}`,...f.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => ({
    template: \`<button @click="show">Show Info</button>\`,
    setup() {
      const show = () => notify({
        title: 'Info',
        message: 'Information',
        type: 'info'
      });
      return {
        show
      };
    }
  })
}`,...d.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => ({
    template: \`<button @click="show">Show Warning</button>\`,
    setup() {
      const show = () => notify({
        title: 'Warning',
        message: 'Warning!',
        type: 'warning'
      });
      return {
        show
      };
    }
  })
}`,...h.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => ({
    template: \`<div class="flex gap-2">
      <button @click="topLeft" style="margin-right: 10px">Top Left</button>
      <button @click="topRight" style="margin-right: 10px">Top Right</button>
      <button @click="bottomLeft" style="margin-right: 10px">Bottom Left</button>
      <button @click="bottomRight">Bottom Right</button>
    </div>\`,
    setup() {
      const topLeft = () => notify({
        message: 'Top left notification',
        position: 'top-left'
      });
      const topRight = () => notify({
        message: 'Bottom right notification',
        position: 'top-right'
      });
      const bottomLeft = () => notify({
        message: 'Bottom right notification',
        position: 'bottom-left'
      });
      const bottomRight = () => notify({
        message: 'Bottom right notification',
        position: 'bottom-right'
      });
      return {
        topLeft,
        bottomRight,
        topRight,
        bottomLeft
      };
    }
  })
}`,...b.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => ({
    template: \`<div class="flex gap-2">
      <button @click="closable" style="margin-right: 10px">closable</button>
      <button @click="zeroDuration">zeroDuration</button>
    </div>\`,
    setup() {
      const closable = () => notify({
        message: 'This is closable notification, duration 1 min',
        position: 'top-left',
        closable: true,
        duration: 60000,
        type: 'warning'
      });
      const zeroDuration = () => notify({
        title: 'zeroDuration',
        message: 'This notification can close only by click. This notification can close only by click. This notification can close only by click.',
        position: 'top-left',
        duration: 0
      });
      return {
        closable,
        zeroDuration
      };
    }
  })
}`,...C.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => ({
    template: \`<div class="flex gap-2">
      <button @click="SlideFade" style="margin-right: 10px">Slide Fade</button>
      <button @click="Fade" style="margin-right: 10px">Fade</button>
      <button @click="Slide" style="margin-right: 10px">Slide</button>
      <button @click="Scale" style="margin-right: 10px">Scale</button>
      <button @click="Bounce" style="margin-right: 10px">Bounce</button>
      <button @click="Flip" style="margin-right: 10px">Flip</button>
      <button @click="Zoom" style="margin-right: 10px">Zoom</button>
      <button @click="None" style="margin-right: 10px">None</button>
    </div>\`,
    setup() {
      const SlideFade = () => notify({
        title: 'Animations',
        message: 'Animations Test',
        animation: 'slide-fade'
      });
      const Fade = () => notify({
        title: 'Animations',
        message: 'Animations Test',
        animation: 'fade'
      });
      const Slide = () => notify({
        title: 'Animations',
        message: 'Animations Test',
        animation: 'slide'
      });
      const Scale = () => notify({
        title: 'Animations',
        message: 'Animations Test',
        animation: 'scale'
      });
      const Bounce = () => notify({
        title: 'Animations',
        message: 'Animations Test',
        animation: 'bounce'
      });
      const Flip = () => notify({
        title: 'Animations',
        message: 'Animations Test',
        animation: 'flip'
      });
      const Zoom = () => notify({
        title: 'Animations',
        message: 'Animations Test',
        animation: 'zoom'
      });
      const None = () => notify({
        title: 'Animations',
        message: 'Animations Test',
        animation: 'none'
      });
      return {
        SlideFade,
        Fade,
        Slide,
        Scale,
        Bounce,
        Flip,
        Zoom,
        None
      };
    }
  })
}`,...y.parameters?.docs?.source}}};const i2=["Success","Error","Info","Warning","Positioned","Closable","Animations"];export{y as Animations,C as Closable,f as Error,d as Info,b as Positioned,g as Success,h as Warning,i2 as __namedExportsOrder,n2 as default};
