// Generated by CoffeeScript 1.4.0
(function() {

  client.views.client = Backbone.View.extend({
    events: {
      'click #add-session': 'showAddSession',
      'click #add-session-form .add': 'addSession',
      'click #add-session-form .cancel': 'cancelAddSession',
      'click #add-payment': 'showAddPayment',
      'click #add-payment-form .add': 'addPayment',
      'click #add-payment-form .cancel': 'cancelAddPayment'
    },
    initialize: function() {
      var that;
      that = this;
      return this.on('render', function(el) {
        return $("[contenteditable]", el).on('input', _.debounce(function() {
          var url;
          url = '/client/{0}'.supplant([that.model.get('name')]);
          return $.post(url, RJS.keyValue($(this).data('name'), $(this).html()));
        }, 1000));
      });
    },
    showAddSession: function(e) {
      e.preventDefault();
      $('#add-session').hide();
      return $('#add-session-form').fadeIn();
    },
    addSession: function(e) {
      var url;
      e.preventDefault();
      url = '/client/{0}/push/sessions'.supplant([this.model.get('name')]);
      return $.post(url, $('#add-session-form').serializeObject(), $('#add-session-form').hide(), $('#add-session').fadeIn(), location.reload());
    },
    cancelAddSession: function(e) {
      e.preventDefault();
      $('#add-session-form').hide();
      return $('#add-session').fadeIn();
    },
    showAddPayment: function(e) {
      e.preventDefault();
      $('#add-payment').hide();
      return $('#add-payment-form').fadeIn();
    },
    addPayment: function(e) {
      var url;
      e.preventDefault();
      url = '/client/{0}/push/payments'.supplant([this.model.get('name')]);
      return $.post(url, $('#add-payment-form').serializeObject(), $('#add-payment-form').hide(), $('#add-payment').fadeIn(), location.reload());
    },
    cancelAddPayment: function(e) {
      e.preventDefault();
      $('#add-payment-form').hide();
      return $('#add-payment').fadeIn();
    },
    buildRow: function(label, name) {
      return ['tr', [['td', label], ['td', this.model.get(name)]]];
    },
    buildEditableRow: function(label, name) {
      return [
        'tr', [
          ['td', label], [
            'td div', {
              'data-name': name,
              contenteditable: true,
              html: true
            }, this.model.get(name)
          ]
        ]
      ];
    },
    build: function() {
      return [
        '#page-client', [
          [
            '.container-narrow', [
              [
                '.masthead', [
                  [
                    'h3 a.muted', {
                      href: '/'
                    }, 'College Coding'
                  ]
                ]
              ], ['hr'], [
                'h1', {
                  'data-name': 'name',
                  contenteditable: true
                }, this.model.get('name')
              ], [
                '.row-fluid.marketing', [
                  ['.span6', [['table.def-list', [['tr', [['td', 'First Contact'], ['td', moment(this.model.get('firstContact')).format('MMMM Do, YYYY')]]], this.buildEditableRow('Client Type', 'clientType'), this.buildEditableRow('Balance', 'balance'), this.buildEditableRow('Platform', 'platform'), this.buildEditableRow('Timezone', 'timezone'), this.buildEditableRow('Referrer', 'referrer'), this.buildEditableRow('City', 'city'), this.buildEditableRow('State', 'state'), this.buildEditableRow('Phone', 'phone'), this.buildEditableRow('School', 'school'), this.buildEditableRow('Program', 'program'), this.buildEditableRow('Class', 'class'), this.buildEditableRow('Notes', 'notes'), this.buildEditableRow('Notes2', 'notes2')]]]], [
                    '.span6', [
                      ['h4', 'Balance'], ['table.def-list', this.buildBalance()], ['h4', 'Sessions'], ['table.def-list', this.model.get('sessions').map(this.buildSession)], [
                        'a#add-session', {
                          href: '#'
                        }, 'Add'
                      ], [
                        'form#add-session-form.form-inline.hide', [
                          [
                            'input.input-mini', {
                              name: 'date',
                              type: 'text',
                              value: moment().format('M/D/YY')
                            }
                          ], [
                            'input.input-mini', {
                              name: 'duration',
                              type: 'text',
                              value: 1
                            }
                          ], ['button.add.btn', 'Add'], ['button.cancel.btn.btn-link', 'Cancel']
                        ]
                      ], ['h4', 'Payments'], ['table.def-list', this.model.get('payments').map(this.buildPayment)], [
                        'a#add-payment', {
                          href: '#'
                        }, 'Add'
                      ], [
                        'form#add-payment-form.form-inline.hide', [
                          [
                            'input.input-mini', {
                              name: 'date',
                              type: 'text',
                              value: moment().format('M/D/YY')
                            }
                          ], [
                            'input.input-mini', {
                              name: 'amount',
                              type: 'text',
                              value: 1
                            }
                          ], ['button.add.btn', 'Add'], ['button.cancel.btn.btn-link', 'Cancel']
                        ]
                      ]
                    ]
                  ]
                ]
              ], new client.partials.footer()
            ]
          ]
        ]
      ];
    },
    buildSession: function(session) {
      return ['tr', [['td', moment(session.date).format('M/D/YY')], ['td', "" + session.duration + " hr"]]];
    },
    buildPayment: function(payment) {
      return ['tr', [['td', moment(payment.date).format('M/D/YY')], ['td', payment.amount]]];
    },
    buildBalance: function() {
      var paymentHours, sessionHours;
      paymentHours = this.model.get('payments').pluck('amount');
      sessionHours = this.model.get('sessions').pluck('duration').map(function(x) {
        return -x;
      });
      return _.reduce(paymentHours.concat(sessionHours), (function(x, y) {
        return x + y;
      }), 0);
    }
  });

}).call(this);
