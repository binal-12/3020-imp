const countryID = document.getElementById("country")

const changeCountry = (countryName) => {
    countryID.textContent = countryName
}

const availabe = [
    'United States of America', 'United Kingdom',    'Canada',
    'China',  'Hungary',   'Netherlands',
    'Egypt', 'Philippines',   'France',
    'Greece',    'India',     'Ireland',
    'Italy',  'Jamaica',   'Japan',
    'Kenya',   'Malaysia',  'Mexico',
    'Morocco', 'Poland',     'Portugal',
    'Russia',  'Spain',    'Thailand',
    'Tunisia', 'Turkey',    'Ukraine',  'Vietnam'
  ]


fetch('./data/ne_110m_admin_0_countries.geojson').then(res => res.json()).then(countries =>

    {
    const world = Globe()
      .atmosphereColor('#6FC2E9')
      .labelColor(() => '#111')
      .width(600)
      .height(600)
      .globeImageUrl('./assets/water.png')
      .backgroundColor("#FFFFFF")
      .polygonsData(countries.features)
    //   .polygonsData(countries.features.filter(f => availabe.some(a => a == f.properties.ADMIN)))
      //.globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
      //.PolygonMargin(0)
      // .hexPolygonUseDots(false)
      // .polygonCapColor(() => "#FFF")
      .polygonCapColor(f => availabe.some(a => a == f.properties.ADMIN) ? `#${Math.round(Math.random() * Math.pow(2, 24)).toString(16).padStart(6, '0')}` : "#FFF")
    //   .polygonCapColor(() => `#${Math.round(Math.random() * Math.pow(2, 24)).toString(16).padStart(6, '0')}`)
      .polygonLabel(({ properties: d }) => availabe.some(a => a == d.ADMIN) ? `
          <b style="color: black;">${d.ADMIN} (${d.ISO_A2})</b> <br />
      ` : '')
      .polygonSideColor(() => '#FFFFFF')
      .polygonStrokeColor(() => '#111')
      .polygonAltitude(0.01)
      .onPolygonClick(({properties: d}) => {
            if(availabe.some(a => a == d.ADMIN)){
                changeCountry(d.ADMIN)
            }
      })
      (document.getElementById('globe'))
  });