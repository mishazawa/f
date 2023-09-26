import numpy as np

def run(hou, hipfile, value):
  FILENAME = "temp/out.fbx"
  # hipfile
  hou.hipFile.load(hipfile)

  remesh_node = hou.node("/obj/SIMPLE_API/REMESH")
  remesh_node.parm('targetsize').set(float(np.clip(value, .01, 1)))

  out_node = hou.node("/obj/SIMPLE_API/OUT")
  out_node.cook()

  fbx_rop = hou.node('/out').createNode('filmboxfbx')

  # set the output path to whereever you want the file to go
  fbx_rop.parm('sopoutput').set(FILENAME)
  fbx_rop.parm('convertunits').set(True)
  fbx_rop.parm('embedmedia').set(True)
  fbx_rop.parm('exportkind').set(False)

  # Path to object hierarchy you want to export
  obj_path = out_node.path()
  fbx_rop.parm('startnode').set(obj_path)

  # Now just run the “render” method on the node, and delete the ROP
  fbx_rop.render()
  fbx_rop.destroy()

  return FILENAME