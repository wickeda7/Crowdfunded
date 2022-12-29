export const abi = [{"type":"event","anonymous":false,"name":"AdminChanged","inputs":[{"type":"address","name":"previousAdmin","indexed":false},{"type":"address","name":"newAdmin","indexed":false}]},{"type":"event","anonymous":false,"name":"BeaconUpgraded","inputs":[{"type":"address","name":"beacon","indexed":true}]},{"type":"event","anonymous":false,"name":"Upgraded","inputs":[{"type":"address","name":"implementation","indexed":true}]},{"type":"function","name":"admin","constant":false,"payable":false,"gas":29000000,"inputs":[],"outputs":[{"type":"address","name":"admin_"}]},{"type":"function","name":"changeAdmin","constant":false,"payable":false,"gas":29000000,"inputs":[{"type":"address","name":"newAdmin"}],"outputs":[]},{"type":"function","name":"implementation","constant":false,"payable":false,"gas":29000000,"inputs":[],"outputs":[{"type":"address","name":"implementation_"}]},{"type":"function","name":"upgradeTo","constant":false,"payable":false,"gas":29000000,"inputs":[{"type":"address","name":"newImplementation"}],"outputs":[]},{"type":"function","name":"upgradeToAndCall","constant":false,"stateMutability":"payable","payable":true,"gas":29000000,"inputs":[{"type":"address","name":"newImplementation"},{"type":"bytes","name":"data"}],"outputs":[]},{"type":"error","name":"NotOwner","inputs":[]},{"type":"event","anonymous":false,"name":"Pledge","inputs":[{"type":"address","name":"caller","indexed":true},{"type":"uint256","name":"amount","indexed":false}]},{"type":"event","anonymous":false,"name":"ValueChanged","inputs":[{"type":"uint256","name":"goal","indexed":false},{"type":"uint32","name":"end","indexed":false}]},{"type":"function","name":"balanceOf","constant":true,"stateMutability":"view","payable":false,"gas":29000000,"inputs":[],"outputs":[{"type":"uint256"}]},{"type":"function","name":"getContractBalance","constant":true,"stateMutability":"view","payable":false,"gas":29000000,"inputs":[],"outputs":[{"type":"uint256"}]},{"type":"function","name":"getEDate","constant":true,"stateMutability":"view","payable":false,"gas":29000000,"inputs":[],"outputs":[{"type":"uint32"}]},{"type":"function","name":"getGoal","constant":true,"stateMutability":"view","payable":false,"gas":29000000,"inputs":[],"outputs":[{"type":"uint256"}]},{"type":"function","name":"getOwner","constant":true,"stateMutability":"view","payable":false,"gas":29000000,"inputs":[],"outputs":[{"type":"address"}]},{"type":"function","name":"getPledgeAmount","constant":true,"stateMutability":"view","payable":false,"gas":29000000,"inputs":[],"outputs":[{"type":"uint256"}]},{"type":"function","name":"getRefundAmount","constant":true,"stateMutability":"view","payable":false,"gas":29000000,"inputs":[],"outputs":[{"type":"uint256"}]},{"type":"function","name":"i_owner","constant":true,"stateMutability":"view","payable":false,"gas":29000000,"inputs":[],"outputs":[{"type":"address"}]},{"type":"function","name":"pledge","constant":false,"payable":false,"gas":29000000,"inputs":[{"type":"uint256","name":"_amount"}],"outputs":[]},{"type":"function","name":"refund","constant":false,"payable":false,"gas":29000000,"inputs":[{"type":"uint256","name":"_amount"}],"outputs":[]},{"type":"function","name":"s_addressToAmountFunded","constant":true,"stateMutability":"view","payable":false,"gas":29000000,"inputs":[{"type":"address"}],"outputs":[{"type":"uint256"}]},{"type":"function","name":"s_funders","constant":true,"stateMutability":"view","payable":false,"gas":29000000,"inputs":[{"type":"uint256"}],"outputs":[{"type":"address"}]},{"type":"function","name":"store","constant":false,"payable":false,"gas":29000000,"inputs":[{"type":"uint256","name":"_goal"},{"type":"uint32","name":"_endAt"},{"type":"address","name":"_token"}],"outputs":[]},{"type":"function","name":"withdraw","constant":false,"payable":false,"gas":29000000,"inputs":[{"type":"uint256","name":"_amount"}],"outputs":[]},{"type":"constructor","stateMutability":"payable","payable":true,"inputs":[{"type":"address","name":"_logic"},{"type":"address","name":"admin_"},{"type":"bytes","name":"_data"}]}]