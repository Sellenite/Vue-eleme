<template>
    <div class="goods">
        <div class="menu-wrapper" ref="menuWrapper">
            <ul>
                <li v-for="(item, index) in goods" class="menu-item" v-bind:class="{'current':currentIndex===index}" v-on:click="selectMenu(index, $event)">
                    <span class="text border-1px">
                        <span v-show="item.type>0" class="icon" v-bind:class="classMap[item.type]"></span>{{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper" ref="foodsWrapper">
            <ul>
                <li v-for="(item, index) in goods" class="food-list food-list-hook">
                    <h1 class="title">{{item.name}}</h1>
                    <ul>
                        <li v-for="food in item.foods" class="food-item border-1px">
                            <div class="icon">
                                <img v-bind:src="food.icon" width="57" height="57">
                            </div>
                            <div class="content">
                                <h2 class="name">{{food.name}}</h2>
                                <p class="desc">{{food.description}}</p>
                                <div class="extra">
                                    <span class="count">月售{{food.sellCount}}份</span>
                                    <span>好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span class="now">￥{{food.price}}</span>
                                    <span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
                                </div>
                                <div class="cartcontrol-wrapper">
                                    <cartcontrol v-bind:food="food" ></cartcontrol>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <shopcart ref="shopcart" v-bind:deliveryPrice="seller.deliveryPrice" v-bind:minPrice="seller.minPrice" v-bind:select-foods="selectFoods"></shopcart>
    </div>
</template>

<script type="text/ecmascript-6">
    import BScroll from 'better-scroll';
    import shopcart from '../shopcart/shopcart';
    import cartcontrol from '../cartcontrol/cartcontrol';

    const ERR_OK = 0;

    export default {
        props: {
            seller: {
                type: Object
            }
        },
        data() {
            return {
                goods: [],
                listHeight: [],
                scrollY: 0
            };
        },
        created() {
            this.$http.get('/api/goods').then((response) => {
                response = response.body;
                if (response.errno === ERR_OK) {
                    this.goods = response.data;
                    /* 当DOM更新后执行以下代码 */
                    this.$nextTick(() => {
                        this._initScroll();
                        this._calculateHeight();
                    });
                }
            });
            /* 用来绑定图标的class */
            this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
        },
        computed: {
            /* 每当其中的数据有变化的时候就会计算，这里是通过scrollY的变化来返回当前在foodmenu的index */
            currentIndex() {
                for (let i = 0; i < this.listHeight.length; i++) {
                    let height1 = this.listHeight[i];
                    let height2 = this.listHeight[i + 1];
                    if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
                        return i;
                    }
                }
                return 0;
            },
            selectFoods() {
                let foods = [];
                this.goods.forEach((good) => {
                    good.foods.forEach((food) => {
                        if (food.count) {
                            foods.push(food);
                        }
                    });
                });
                return foods;
            }
        },
        methods: {
            /* 设定原始option和当滚动的时候拿到scrollY */
            _initScroll() {
                /* 启用click事件 */
                this.menuScroll = new BScroll(this.$refs.menuWrapper, {
                    click: true
                });
                /* 延迟到事件完毕后触发 */
                this.foodScroll = new BScroll(this.$refs.foodsWrapper, {
                    click: true,
                    probeType: 3
                });
                /* better-scroll设的event */
                this.foodScroll.on('scroll', (pos) => {
                    this.scrollY = Math.abs(Math.round(pos.y));
                });
            },
            /* 计算每个大的list的相对高度 */
            _calculateHeight() {
                let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
                let height = 0;
                for (let i = 0; i < foodList.length; i++) {
                    let item = foodList[i];
                    height = (item.offsetTop - 1);
                    this.listHeight.push(height);
                    console.log(this.listHeight);
                }
            },
            /* 点击menu时跳转 */
            selectMenu(index, event) {
                /* 这句的意思是PC端会有两次点击事件，过滤掉PC的其中一个点击事件，这个是better-scroll特有的，所以保留 */
                if (!event._constructed) {
                    return;
                }
                let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
                let el = foodList[index];
                this.foodScroll.scrollToElement(el, 300);
            },
            addFood(target) {
                this._drop(target);
            },
            _drop(target) {
                // 体验优化,异步执行下落动画
                this.$nextTick(() => {
                    this.$refs.shopcart.drop(target);
                });
            }
        },
        components: {
            shopcart,
            cartcontrol
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"
    .goods
        display: flex
        position: absolute
        width: 100%
        top: 186px
        bottom: 46px
        overflow: hidden
        .menu-wrapper
            flex: 0 0 90px
            /* 兼容性问题，安卓 */
            width: 80px
            background: #F3F5F7
            .menu-item
                display: table
                height: 54px
                width: 56px
                line-height: 14px
                padding: 0 17px
                &.current
                    position: relative
                    margin-top: -1px
                    background: #FFF
                    font-weight: 700
                    .text
                        border-none()
                .icon
                    display: inline-block
                    vertical-align: top
                    width: 12px
                    height: 12px
                    margin-right: 2px
                    background-size: 12px 12px
                    background-repeat: no-repeat
                    &.decrease
                        bg-image('decrease_3')
                    &.discount
                        bg-image('discount_3')
                    &.guarantee
                        bg-image('guarantee_3')
                    &.invoice
                        bg-image('invoice_3')
                    &.special
                        bg-image('special_3')
                .text
                    display: table-cell
                    width: 56px
                    vertical-align: middle
                    font-size: 12px
                    border-1px(rgba(7, 17, 27, 0.1))
        .foods-wrapper
            flex: 1
            .title
                padding-left: 14px
                height: 26px
                line-height: 26px
                border-left: 2px solid #D9DDE1
                font-size: 12px
                color: rgb(147, 153, 159)
                background: #F3F5F7
            .food-item
                display: flex
                margin: 18px
                padding-bottom: 18px
                border-1px(rgba(7, 17, 27, 0.1))
                &:last-child
                    border-none()
                    margin-bottom: 0
                .icon
                    flex: 0 0 57px
                    margin-right: 10px
                .content
                    flex: 1
                    .name
                        margin: 2px 0 8px 0
                        height: 14px
                        line-height: 14px
                        font-size: 14px
                        color: rgb(7, 17, 27)
                    .desc
                        margin-bottom: 8px
                        line-height: 12px
                        font-size: 10px
                        color: rgb(147, 153, 159)
                    .extra
                        line-height: 10px
                        font-size: 10px
                        color: rgb(147, 153, 159)
                        .count
                            margin-right: 12px
                    .price
                        font-weight: 700
                        line-height: 24px
                        .now
                            margin-right: 8px
                            font-size: 14px
                            color: rgb(240, 20, 20)
                        .old
                            text-decoration: line-through
                            font-size: 10px
                            color: rgb(147, 153, 159)
                    .cartcontrol-wrapper
                        position: absolute
                        right: 0
                        bottom: 12px
</style>