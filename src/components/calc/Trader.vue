<template>

    <tr class="trader">
        <td class="user-date-ceil b_s p-clear-hard ov-hide">
            <Date
                :userID="showId"
            />
        </td>
        <td class="name b_right color-trader">
            {{ showId }}
        </td>

        <td class="editable fs-8">
            <input
                class="fs-8 color-trader placeholder-trader"
                placeholder="?"
                type="text"

                :value="trader.depo"

                @change="updateDeposit"
                @keypress="checkEnter( $event )"

                :ref="`input`"
            >
        </td>

        <td class="b_right color-blue">
            {{ trader.percentFromDeposit  | calcTd | number | addSymbol( '%' ) }}
        </td>

        <td>
            {{ trader.balance  | calcTd | number }}
        </td>

        <td class="none">
            <span class="color-muted">
                {{ trader.balanceInPercents | calcTd | number | addSymbol( '%' ) }}
            </span>
        </td>

        <td class="none color-trader fs-8">
            {{ trader.profit | deleteNull | toNormalNumbers }}
        </td>

        <td class="none color-trader fs-8">
            {{ trader.profitInPercents | calcTd | number | addSymbol( '%' ) }}
        </td>

        <td class="b_right none color-browl no-const-contain">
            no = const
        </td>

        <td class="fs-8 none color-trader">
            {{ trader.finalProfit | calcTd | number }}
        </td>
        
        <td class="fs-7 b_right none no-const-contain color-trader">
            no = const
        </td>
        
        <td class="fs-8 none color-trader">
            {{ trader.newCapital | calcTd | number }}
        </td>
        
        <td class="b_right none color-green">
            {{ trader.newCapitalInPercents | calcTd | number | addSymbol( '%' ) }}
        </td>
    </tr>

</template>

<script>

import { mapActions } from 'vuex';

import Date from './Date.vue';

const actionsList = [
    'updateUserDeposit',
    'updateFocusDown',
    'regiterInputCallback'
];

export default {
	name: 'Trader',
    components: {
        Date
    },
    props: ['trader', 'showId'],
    methods: {
        ...mapActions( actionsList ),
        setFocus(){
            this.$refs.input.focus();
        },
        updateDeposit( e ){
            if ( !isNaN( +e.target.value ) ){
                this.updateUserDeposit( {id: this.trader.id, newValue: +e.target.value} );
            } else {
                this.updateUserDeposit( {id: this.trader.id, newValue: 0} );
            }
        },
        checkEnter( e ){
            if( e.keyCode === 13 ){
                this.updateFocusDown( {id: this.showId, type: 'depos'} );
            }
        },
    },
	mounted(){
        this.regiterInputCallback({
            id: this.showId,
            callback: this.setFocus,
            type: 'depos'
        });
    }
}

</script>

<style lang="scss" scoped>
	@import '../../assets/SCSS/base.scss';

    td.editable {
        background-color: #f1f1f1;
    }
    td {
        border: 1px solid $base-border-color;
        font-size: 7pt;
        padding: 5px 4px 3px 4px;
        text-align: right;
        white-space: nowrap;
    }
    td > input {
        width: 100%;
        height: 100%;
        border: 0px;
        outline: none;
        text-align: right;
        background-color: transparent;
    }

    input:focus,
    input:active {
        outline: none;
        border: 0px;
        background-color: transparent;
    }

    .name {
        text-align: center;
        width: 13px;
    }

    tr > td.b_right {
        border-right: 1px solid #000;
    }
    tr > td.b_left {
        border-left: 1px solid #000;
    }

    .last > td {
        border-bottom: 1px solid black;
    }
</style>