import { useRef } from 'react'
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import RectangleOutlinedIcon from '@mui/icons-material/RectangleOutlined';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import TextFieldsOutlinedIcon from '@mui/icons-material/TextFieldsOutlined';
import IconButton from '@mui/material/IconButton';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import CodeIcon from '@mui/icons-material/Code';
import './toolbar.css';

function ToolBar({addRect, addCircle, addText, addLine, addPen, handleImageUpload, addTriangle, clear, download, deleteCanvas, save, generate}) {
    const fileInputRef = useRef(null);
    return (
        <div className='toolbar'>
          <Tooltip TransitionComponent={Zoom} title="Rectangle tool">
            <IconButton sx={{transition: "transform 0.1s ease-in-out"}} className='toolbar_opts' onClick={addRect}>
              <RectangleOutlinedIcon style={{ color: '#ffffff' }} />
            </IconButton>
          </Tooltip>
          <Tooltip TransitionComponent={Zoom} title="Circle tool">
            <IconButton sx={{transition: "transform 0.1s ease-in-out"}} className='toolbar_opts' onClick={addCircle}>
              <CircleOutlinedIcon style={{ color: '#ffffff' }} />
            </IconButton>
          </Tooltip>
          <Tooltip TransitionComponent={Zoom} title="Triangle tool">
            <IconButton sx={{transition: "transform 0.1s ease-in-out"}} className='toolbar_opts' onClick={addTriangle}>
              <ChangeHistoryIcon style={{ color: '#ffffff' }} />
            </IconButton>
          </Tooltip>
          <Tooltip TransitionComponent={Zoom} title="Line tool">
            <IconButton sx={{transition: "transform 0.1s ease-in-out"}} className='toolbar_opts' onClick={addLine}>
              <TimelineOutlinedIcon style={{ color: '#ffffff' }} />
            </IconButton>
          </Tooltip>
          <Tooltip TransitionComponent={Zoom} title="Text tool">
            <IconButton sx={{transition: "transform 0.1s ease-in-out"}} className='toolbar_opts' onClick={addText}>
              <TextFieldsOutlinedIcon style={{ color: '#ffffff' }} />
            </IconButton>
          </Tooltip>
          <Tooltip TransitionComponent={Zoom} title="Image tool">
            <IconButton >
              <label htmlFor="file-input" style={{display: 'flex'}}>
                <ImageOutlinedIcon style={{ color: '#ffffff' }}  />
              </label>
            </IconButton>
          </Tooltip>
          <Tooltip TransitionComponent={Zoom} title="Clear canvas">
            <IconButton sx={{transition: "transform 0.1s ease-in-out"}} className='toolbar_opts' onClick={clear}>
              <ClearOutlinedIcon style={{ color: '#ffffff' }} />
            </IconButton>
          </Tooltip>
            <input
                id='file-input'
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleImageUpload}
            />
          {/* <IconButton sx={{transition: "transform 0.1s ease-in-out"}} className='toolbar_opts' onClick={addPen}>
            <CreateOutlinedIcon style={{ color: '#ffffff' }}/>
            </IconButton> */}
          <Tooltip TransitionComponent={Zoom} title="Download as PNG">
            <IconButton sx={{transition: "transform 0.1s ease-in-out"}} className='toolbar_opts' onClick={download}>
              <FileDownloadOutlinedIcon style={{ color: '#ffffff' }} />
            </IconButton>
          </Tooltip>
          <Tooltip TransitionComponent={Zoom} title="Save">
            <IconButton sx={{transition: "transform 0.1s ease-in-out"}} className='toolbar_opts' onClick={save}>
              <SaveOutlinedIcon style={{ color: '#ffffff' }} />
            </IconButton>
          </Tooltip>
          <Tooltip TransitionComponent={Zoom} title="Delete canvas">
            <IconButton sx={{transition: "transform 0.1s ease-in-out"}} className='toolbar_opts' onClick={deleteCanvas}>
              <DeleteOutlinedIcon style={{ color: '#ffffff' }} />
            </IconButton>
          </Tooltip>
          <Tooltip TransitionComponent={Zoom} title="Genrate HTML">
            <IconButton sx={{transition: "transform 0.1s ease-in-out"}} className='toolbar_opts' onClick={generate}>
              <CodeIcon style={{ color: '#ffffff' }} />
            </IconButton>
          </Tooltip>
        </div>
    )
}

export default ToolBar;