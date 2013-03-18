client.views.client = Backbone.View.extend(
  build: () ->
    ['#page-client', [
      ['.container-narrow', [
        ['.masthead', [
          ['h3 a.muted', {href: '/'}, 'College Coding']
        ]]
        ['hr']
        ['h1', this.model.get('name')]
        ['.row-fluid.marketing', [

          ['.span6', [
            ['table.def-list', [
              ['tr', [
                ['td', 'First Contact']
                ['td', moment(this.model.get('firstContact')).format('MMMM Do, YYYY')]
              ]]
              ['tr', [
                ['td', 'Client Type']
                ['td', this.model.get('clientType')]
              ]]
              ['tr', [
                ['td', 'Balance']
                ['td', this.model.get('balance')]
              ]]
              ['tr', [
                ['td', 'Platform']
                ['td', this.model.get('platform')]
              ]]
              ['tr', [
                ['td', 'Timezone']
                ['td', this.model.get('timezone')]
              ]]
              ['tr', [
                ['td', 'Referrer']
                ['td', this.model.get('referrer')]
              ]]
              ['tr', [
                ['td', 'City']
                ['td', this.model.get('city')]
              ]]
              ['tr', [
                ['td', 'State']
                ['td', this.model.get('state')]
              ]]
              ['tr', [
                ['td', 'Phone']
                ['td', this.model.get('phone')]
              ]]
              ['tr', [
                ['td', 'School']
                ['td', this.model.get('school')]
              ]]
              ['tr', [
                ['td', 'Program']
                ['td', this.model.get('schoolProgram')]
              ]]
              ['tr', [
                ['td', 'Class']
                ['td', this.model.get('schoolClass')]
              ]]
              ['tr', [
                ['td', 'Notes']
                ['td', this.model.get('notes')]
              ]]
              ['tr', [
                ['td', 'Notes2']
                ['td', this.model.get('notes2')]
              ]]
            ]]
          ]]

          ['.span6', [
            ['h4', 'Past Sessions']
            'test'
          ]]
        ]]

        new client.partials.footer()
      ]]
    ]]
  )