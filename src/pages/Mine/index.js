import React, { Component } from "react";
import { Switch, Route } from 'react-router-dom'

// import MineHome from '../../components/minerouter/minehome';
import MineHome from '../../components/minerouter/minehome';
import Money from '../../components/minerouter/money';
import Discount from '../../components/minerouter/discount';
import Voucher from '../../components/minerouter/voucher';
import Order from '../../components/minerouter/order';
import Address from '../../components/minerouter/address/index';
class Mine extends Component {
    state = {
    }
    render() {
        let { match } = this.props
        return (
            <div>
                <Switch>
                    <Route path={match.path + "/money"} component={Money} />
                    <Route path={match.path + "/discount"} component={Discount} />
                    <Route path={match.path + "/voucher"} component={Voucher} />
                    <Route path={match.path + "/order"} component={Order} />
                    <Route path={match.path + "/address"} component={Address} />
                    <Route path={match.path} component={MineHome} exact />
                </Switch>
            </div>
        )
    }
}

export default Mine;