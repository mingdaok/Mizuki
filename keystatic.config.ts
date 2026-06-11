import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  // 开发环境下使用本地文件存储，生产环境下使用 GitHub 存储
  storage: process.env.NODE_ENV === 'development' ? { kind: 'local' } : {
    kind: 'github',
    repo: 'mingdaok/My-blog' // 注意：部署到线上前请替换为您的仓库名
  },
  singletons: {
    about: singleton({
      label: '关于我单页 (About)',
      path: 'src/content/spec/about',
      format: { contentField: 'content' },
      schema: {
        content: fields.markdoc({ label: '正文内容 (Content)', extension: 'md' })
      }
    })
  },
  collections: {
    posts: collection({
      label: '文章 (Posts)',
      slugField: 'title',
      path: 'src/content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: '标题 (Title)' } }),
        published: fields.date({ label: '发布日期 (Published)', validation: { isRequired: true } }),
        updated: fields.date({ label: '更新日期 (Updated)' }),
        draft: fields.checkbox({ label: '草稿 (Draft)', defaultValue: false }),
        description: fields.text({ label: '摘要 (Description)', multiline: true }),
        image: fields.text({ label: '封面图片路径 (Image)' }),
        tags: fields.array(fields.text({ label: '标签' }), { label: '标签列表 (Tags)', itemLabel: props => props.value }),
        category: fields.text({ label: '分类 (Category)' }),
        lang: fields.text({ label: '语言 (Lang)' }),
        pinned: fields.checkbox({ label: '置顶 (Pinned)', defaultValue: false }),
        comment: fields.checkbox({ label: '允许评论 (Comment)', defaultValue: true }),
        priority: fields.number({ label: '置顶优先级 (Priority, 数值越小越高)' }),
        author: fields.text({ label: '作者 (Author)' }),
        sourceLink: fields.text({ label: '来源链接 (SourceLink)' }),
        licenseName: fields.text({ label: '许可协议 (LicenseName)' }),
        licenseUrl: fields.text({ label: '许可链接 (LicenseUrl)' }),
        encrypted: fields.checkbox({ label: '加密文章 (Encrypted)', defaultValue: false }),
        password: fields.text({ label: '密码 (Password)' }),
        passwordHint: fields.text({ label: '密码提示 (PasswordHint)' }),
        hideHomeContent: fields.checkbox({ label: '隐藏首页摘要 (HideHomeContent)', defaultValue: false }),
        alias: fields.text({ label: '文章别名 (Alias)' }),
        permalink: fields.text({ label: '固定链接 (Permalink)' }),
        content: fields.markdoc({ 
          label: '正文内容 (Content)', 
          extension: 'md',
          options: {
            image: {
              directory: 'public/images/posts',
              publicPath: '/images/posts/'
            }
          }
        }),
      },
    }),
    anime: collection({
      label: '追番 (Anime)',
      slugField: 'title',
      path: 'src/content/anime/*',
      format: { data: 'json' },
      schema: {
        title: fields.slug({ name: { label: '番剧名称 (Title)' } }),
        status: fields.select({
          label: '观看状态 (Status)',
          options: [
            { label: '在看 (Watching)', value: 'watching' },
            { label: '看完 (Completed)', value: 'completed' },
            { label: '计划 (Planned)', value: 'planned' }
          ],
          defaultValue: 'planned'
        }),
        rating: fields.number({ label: '评分 (Rating)' }),
        cover: fields.image({
          label: '封面图片 (Cover)',
          directory: 'public/images/anime',
          publicPath: '/images/anime/'
        }),
        description: fields.text({ label: '简介 (Description)', multiline: true }),
        episodes: fields.text({ label: '集数描述 (Episodes)' }),
        year: fields.text({ label: '年份 (Year)' }),
        genre: fields.array(fields.text({ label: '标签' }), { label: '类型标签 (Genre)', itemLabel: props => props.value }),
        studio: fields.text({ label: '制作公司 (Studio)' }),
        link: fields.text({ label: '外部链接 (Link)' }),
        progress: fields.number({ label: '观看进度 (Progress)' }),
        totalEpisodes: fields.number({ label: '总集数 (Total Episodes)' }),
        startDate: fields.text({ label: '开始日期 (Start Date)' }),
        endDate: fields.text({ label: '结束日期 (End Date)' })
      }
    }),
    diary: collection({
      label: '日记 (Diary)',
      slugField: 'title',
      path: 'src/content/diary/*',
      format: { data: 'json' },
      schema: {
        title: fields.slug({ name: { label: '日记标题/编号 (Title)' } }),
        content: fields.text({ label: '正文内容 (Content)', multiline: true }),
        date: fields.datetime({ label: '发布时间 (Date)' }),
        images: fields.array(
          fields.image({
            label: '配图',
            directory: 'public/images/diary',
            publicPath: '/images/diary/'
          }),
          { label: '配图列表 (Images)', itemLabel: props => props.value || '未上传图片' }
        ),
        location: fields.text({ label: '地理位置 (Location)' }),
        mood: fields.text({ label: '心情 (Mood)' }),
        tags: fields.array(fields.text({ label: '标签' }), { label: '标签列表 (Tags)', itemLabel: props => props.value })
      }
    }),
    albums: collection({
      label: '照片墙相册 (Albums)',
      slugField: 'id',
      path: 'src/content/albums/*',
      format: { data: 'json' },
      schema: {
        id: fields.slug({ name: { label: '相册英文 ID (ID)' } }),
        title: fields.text({ label: '相册标题 (Title)' }),
        description: fields.text({ label: '相册描述 (Description)', multiline: true }),
        date: fields.date({ label: '发布日期 (Date)' }),
        location: fields.text({ label: '地点 (Location)' }),
        tags: fields.array(fields.text({ label: '标签' }), { label: '标签列表 (Tags)', itemLabel: props => props.value }),
        photos: fields.array(
          fields.object({
            image: fields.image({
              label: '照片',
              directory: 'public/images/albums',
              publicPath: '/images/albums/'
            }),
            caption: fields.text({ label: '附语 (Caption)' }),
            tags: fields.array(fields.text({ label: '标签' }), { label: '标签列表 (Tags)', itemLabel: props => props.value })
          }),
          { label: '照片列表 (Photos)', itemLabel: props => props.fields.caption.value || '未命名照片' }
        )
      }
    }),
    projects: collection({
      label: '项目展示 (Projects)',
      slugField: 'title',
      path: 'src/content/projects/*',
      format: { data: 'json' },
      schema: {
        title: fields.slug({ name: { label: '项目名称 (Title)' } }),
        description: fields.text({ label: '项目简介 (Description)', multiline: true }),
        image: fields.image({
          label: '项目预览图 (Image)',
          directory: 'public/images/projects',
          publicPath: '/images/projects/'
        }),
        category: fields.select({
          label: '项目类型 (Category)',
          options: [
            { label: '网页 (Web)', value: 'web' },
            { label: '移动端 (Mobile)', value: 'mobile' },
            { label: '桌面端 (Desktop)', value: 'desktop' },
            { label: '其他 (Other)', value: 'other' }
          ],
          defaultValue: 'web'
        }),
        techStack: fields.array(fields.text({ label: '技术' }), { label: '技术栈 (Tech Stack)', itemLabel: props => props.value }),
        status: fields.select({
          label: '开发状态 (Status)',
          options: [
            { label: '已完成 (Completed)', value: 'completed' },
            { label: '进行中 (In Progress)', value: 'in-progress' },
            { label: '计划中 (Planned)', value: 'planned' }
          ],
          defaultValue: 'completed'
        }),
        liveDemo: fields.text({ label: '在线演示地址 (Live Demo)' }),
        sourceCode: fields.text({ label: '开源地址 (Source Code)' }),
        visitUrl: fields.text({ label: '主页地址 (Visit URL)' }),
        startDate: fields.text({ label: '开始日期 (Start Date)' }),
        endDate: fields.text({ label: '结束日期 (End Date)' }),
        featured: fields.checkbox({ label: '推荐项目 (Featured)', defaultValue: false }),
        tags: fields.array(fields.text({ label: '标签' }), { label: '标签列表 (Tags)', itemLabel: props => props.value }),
        showImage: fields.checkbox({ label: '展示预览图 (Show Image)', defaultValue: true })
      }
    }),
    skills: collection({
      label: '技能展示 (Skills)',
      slugField: 'name',
      path: 'src/content/skills/*',
      format: { data: 'json' },
      schema: {
        name: fields.slug({ name: { label: '技能名称 (Name)' } }),
        description: fields.text({ label: '技能描述 (Description)' }),
        icon: fields.text({ label: '图标代码 (Iconify Icon)' }),
        category: fields.select({
          label: '技能分类 (Category)',
          options: [
            { label: '前端 (Frontend)', value: 'frontend' },
            { label: '后端 (Backend)', value: 'backend' },
            { label: '数据库 (Database)', value: 'database' },
            { label: '工具 (Tools)', value: 'tools' },
            { label: '其他 (Other)', value: 'other' }
          ],
          defaultValue: 'frontend'
        }),
        level: fields.select({
          label: '熟练度 (Level)',
          options: [
            { label: '入门 (Beginner)', value: 'beginner' },
            { label: '熟练 (Intermediate)', value: 'intermediate' },
            { label: '精通 (Advanced)', value: 'advanced' },
            { label: '专家 (Expert)', value: 'expert' }
          ],
          defaultValue: 'intermediate'
        }),
        experienceYears: fields.number({ label: '使用年数 (Years)' }),
        experienceMonths: fields.number({ label: '使用月数 (Months)' }),
        projects: fields.array(fields.text({ label: '项目' }), { label: '相关项目关联 ID (Projects)', itemLabel: props => props.value }),
        certifications: fields.array(fields.text({ label: '证书' }), { label: '相关证书 (Certifications)', itemLabel: props => props.value }),
        color: fields.text({ label: '主题颜色 (Color)' })
      }
    }),
    timeline: collection({
      label: '时间线履历 (Timeline)',
      slugField: 'title',
      path: 'src/content/timeline/*',
      format: { data: 'json' },
      schema: {
        title: fields.slug({ name: { label: '标题 (Title)' } }),
        description: fields.text({ label: '详情描述 (Description)', multiline: true }),
        type: fields.select({
          label: '履历类型 (Type)',
          options: [
            { label: '教育经历 (Education)', value: 'education' },
            { label: '工作经历 (Work)', value: 'work' },
            { label: '项目经验 (Project)', value: 'project' },
            { label: '个人成就 (Achievement)', value: 'achievement' }
          ],
          defaultValue: 'work'
        }),
        startDate: fields.text({ label: '开始时间 (Start Date)' }),
        endDate: fields.text({ label: '结束时间 (End Date)' }),
        location: fields.text({ label: '地点 (Location)' }),
        organization: fields.text({ label: '所属机构/公司 (Organization)' }),
        position: fields.text({ label: '职位/角色 (Position)' }),
        skills: fields.array(fields.text({ label: '技能' }), { label: '掌握的技能 (Skills)', itemLabel: props => props.value }),
        achievements: fields.array(fields.text({ label: '成就' }), { label: '主要成就 (Achievements)', itemLabel: props => props.value }),
        links: fields.array(
          fields.object({
            name: fields.text({ label: '链接名称' }),
            url: fields.text({ label: '链接地址' }),
            type: fields.select({
              label: '链接类型',
              options: [
                { label: '网站', value: 'website' },
                { label: '证书', value: 'certificate' },
                { label: '项目', value: 'project' },
                { label: '其他', value: 'other' }
              ],
              defaultValue: 'website'
            })
          }),
          { label: '相关链接 (Links)', itemLabel: props => props.fields.name.value }
        ),
        icon: fields.text({ label: '自定义图标 (Icon)' }),
        color: fields.text({ label: '自定义颜色 (Color)' }),
        featured: fields.checkbox({ label: '是否高亮推荐 (Featured)', defaultValue: false })
      }
    }),
    friends: collection({
      label: '友情链接 (Friends)',
      slugField: 'title',
      path: 'src/content/friends/*',
      format: { data: 'json' },
      schema: {
        title: fields.slug({ name: { label: '网站名称 (Title)' } }),
        desc: fields.text({ label: '一句话简介 (Description)' }),
        siteurl: fields.text({ label: '网站链接 (URL)' }),
        imgurl: fields.image({
          label: '站长头像 (Avatar)',
          directory: 'public/images/friends',
          publicPath: '/images/friends/'
        }),
        tags: fields.array(fields.text({ label: '标签' }), { label: '站点标签 (Tags)', itemLabel: props => props.value })
      }
    })
  },
});
