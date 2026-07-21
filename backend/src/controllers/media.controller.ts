import { Request, Response } from 'express';
import { cloudinary } from '../config/cloudinary';
import { HttpError } from '../utils/httpError';

/** POST /media/upload [admin] — multipart "file" field → Cloudinary. */
export async function uploadImage(req: Request, res: Response) {
  if (!req.file) throw new HttpError(400, 'No file provided (field name: "file")');
  const result = await new Promise<{ secure_url: string; public_id: string; width: number; height: number }>(
    (resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'portfolio', resource_type: 'auto' },
        (err, r) => (err || !r ? reject(err) : resolve(r as never)),
      );
      stream.end(req.file!.buffer);
    },
  );
  res.status(201).json({
    url: result.secure_url, publicId: result.public_id,
    width: result.width, height: result.height,
  });
}

/** GET /media [admin] — list assets in the portfolio folder. */
export async function listAssets(_req: Request, res: Response) {
  const { resources } = await cloudinary.api.resources({ type: 'upload', prefix: 'portfolio/', max_results: 100 });
  res.json({ assets: resources });
}

/** DELETE /media/:publicId [admin] */
export async function deleteAsset(req: Request, res: Response) {
  await cloudinary.uploader.destroy(`portfolio/${req.params.publicId}`);
  res.json({ ok: true });
}
