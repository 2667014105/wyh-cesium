/**
 * Leaflet 示例配置文件：包含示例的分类、名称、缩略图、文件路径
 */

/**
 * key值：为exampleConfig配置的key值或者fileName值 （为中间节点时是key值，叶结点是fileName值）
 * value值：fontawesome字体icon名
 */
var sideBarIconConfig = {
  scene: "fa-map",
  map: "fa-object-group",
  terrain: "fa-edit ",
  "3dTilesLayers": "fa-tags",
  query: "fa fa-street-view",
  measure: "fa fa-plug",
  analysis: "fa-object-group",
  fly: "fa fa-plug",
  track: "fa-object-group",
  drawTool: "fa-edit",
  visual: "fa-object-group",
  cartoon: "fa fa-street-view",
  drawEdit: "fa-object-group ",
  control: "fa fa-plug",
  bigdata: "fa fa-street-view",
  widgets: "fa-tags",
};

var exampleConfig = {
  scene: {
    name: "场景",
    content: {
      createScene: {
        name: "创建场景",
        content: [
          {
            name: "初始化场景",
            version: "1.0.0",
            thumbnail: "createScene.jpg",
            fileName: "createScene",
          },
        ],
      },
    },
  },
};
