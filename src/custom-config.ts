export default {
  // 1. 对lighthouse默认配置进行扩展
  extends: 'lighthouse:default',

  // 2. 在defaultPass阶段增加自定义gather
  passes: [{
    passName: 'defaultPass',
    gatherers: [
      'custom-gatherer',
    ],
  }],

  // 3. 增加自定义Audit，将会和lighthouse默认的audit列表一起执行
  audits: [
    'custom-audit',
  ],

  // 4. 新建audit分类，和打分权重
  categories: {
    mysite: {
      name: 'My site metrics',
      description: 'Metrics for our super awesome site',
      audits: [
        // When we add more custom audits, `weight` controls how they're averaged together.
        { id: 'custom-audit', weight: 1 },
      ],
    },
  },
};