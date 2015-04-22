var SaleOrder = React.createClass({
    render: function () {
        return (
            <li className="list-group-item">
                Total: { this.props.order.amount_total }
            </li>
        );
    }
});
var Customer = React.createClass({
    render: function () {
        this.props.customer.orders = this.props.customer.orders || [];
        var orders = this.props.customer.orders.map(function (order) {
            return <SaleOrder order={ order }/>
        });
        return (
            <div className="col-md-3">
                <div className="thumbnail">
                    <div className="caption">
                        <h4>{ this.props.customer.name }</h4>
                        <hr/>
                        <ul className="list-group">
                            { orders }
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
});
var CustomerList = React.createClass({
    render: function () {
        var customers = this.props.customers.map(function (customer) {
            return <Customer customer={ customer }/>;
        });
        return (
            <div className="col-md-12">
                { customers }
            </div>
        );
    }
});

var socket = io();
var customers = [];
var customersELement = document.querySelector('#customers');

socket.on('load_customers', function (data) {
    customers = data.customers;
    React.render(<CustomerList customers={ customers }/>, document.getElementById('customers'));
});
socket.on('new_sale_order', function (order) {
    customers.forEach(function (customer) {
        if (customer.id === order.partner_id.id) {
            customer.orders.push(order);
        }
    });
    React.render(<CustomerList customers={ customers }/>, document.getElementById('customers'));
});
