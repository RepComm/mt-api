
import "./mod";

minetest.register_node("test", {
  description: "test block",
  
  tiles: ["test.png"],

  drawtype: "nodebox",
  node_box: {
    type: "fixed",
    fixed: [
      -0.5,-0.5,-0.5,
       0.5, 0.5, 0.5
    ]
  }
});
