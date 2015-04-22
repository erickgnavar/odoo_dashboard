# Odoo Dashboard
Odoo realtime dashboard

example
```python
# coding: utf-8
import urllib2
import json

from openerp import models, api


class SaleOrder(models.Model):

    _inherit = 'sale.order'

    @api.model
    def create(self, values):
        record = super(SaleOrder, self).create(values)
        data = {
            'partner_id': {
                'id': record.partner_id.id,
                'name': record.partner_id.name
            },
            'amount_total': record.amount_total
        }
        req = urllib2.Request('http://localhost:3000/new-sale-order/', data=json.dumps(data), headers={
            'Content-type': 'application/json'
        })
        urllib2.build_opener().open(req)
        return record

```
